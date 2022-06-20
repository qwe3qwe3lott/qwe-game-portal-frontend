import {io, Socket} from 'socket.io-client';
import store, {AppDispatch, setNickname} from '../store';
import {Events} from './enums/Events';
import {Member} from './types/Member';
import {
	addActCardIds,
	addLogRecord,
	clearStoreAfterLeaving, setCard,
	setFieldCards, setIAmActingFlag,
	setIAmPlayerFlag, setLastWinner, setLogs,
	setMembers,
	setOwnerKey,
	setPlayers, setRoomOptions, setRoomStatus, setSizes, setStartConditionFlag, setTimer
} from './store';
import {Player} from './types/Player';
import {FieldCard} from './types/FieldCard';
import {MovementDto} from './dto/MovementDto';
import {Timer} from './types/Timer';
import {LogRecord} from './types/LogRecord';
import {Sizes} from './types/Sizes';
import {RoomOptions} from './types/RoomOptions';
import {OptionsDto} from './dto/OptionsDto';
import {RoomStatuses} from './enums/RoomStatuses';

export class Api {
	public static readonly MIN_MIN_PLAYERS = 2;
	public static readonly MAX_MIN_PLAYERS = 8;
	public static readonly MIN_MAX_PLAYERS = 2;
	public static readonly MAX_MAX_PLAYERS = 8;
	public static readonly MIN_ROWS = 3;
	public static readonly MAX_ROWS = 7;
	public static readonly MIN_COLUMNS = 3;
	public static readonly MAX_COLUMNS = 7;
	public static readonly MIN_SECONDS_TO_ACT = 15;
	public static readonly MAX_SECONDS_TO_ACT = 180;
	public static readonly MIN_WIN_SCORE = 1;
	public static readonly MAX_WIN_SCORE = 5;
	private _socket?: Socket;
	get socket() { return this._socket; }
	private readonly _appDispatch: AppDispatch;
	constructor(appDispatch: AppDispatch) {
    	this._appDispatch = appDispatch;
	}

	subscribe(): void {
		this._socket = io(`${process.env.REACT_APP_BACKEND_URL}/spy` ?? '');
		this._socket.on(Events.GET_MEMBERS, (members: Member[]) => {
			console.log(Events.GET_MEMBERS, members);
			this._appDispatch(setMembers(members));
		});
		this._socket.on(Events.GET_OWNER_KEY, (ownerKey: string) => {
			console.log(Events.GET_OWNER_KEY, ownerKey);
			this._appDispatch(setOwnerKey(ownerKey));
		});
		this._socket.on(Events.GET_PLAYERS, (players: Player[]) => {
			console.log(Events.GET_PLAYERS, players);
			this._appDispatch(setPlayers(players));
		});
		this._socket.on(Events.GET_FIELD_CARDS, (fieldCards: FieldCard[]) => {
			console.log(Events.GET_FIELD_CARDS, fieldCards);
			this._appDispatch(setFieldCards(fieldCards));
		});
		this._socket.on(Events.GET_ROOM_STATUS, (status: RoomStatuses) => {
			console.log(Events.GET_ROOM_STATUS, status);
			this._appDispatch(setRoomStatus(status));
		});
		this._socket.on(Events.GET_START_CONDITION_FLAG, (flag: boolean) => {
			console.log(Events.GET_START_CONDITION_FLAG, flag);
			this._appDispatch(setStartConditionFlag(flag));
		});
		this._socket.on(Events.GET_ACT_FLAG, (flag: boolean) => {
			console.log(Events.GET_ACT_FLAG, flag);
			this._appDispatch(setIAmActingFlag(flag));
		});
		this._socket.on(Events.GET_SIZES, (sizes: Sizes) => {
			console.log(Events.GET_SIZES, sizes);
			this._appDispatch(setSizes(sizes));
		});
		this._socket.on(Events.GET_ALL_LOG_RECORDS, (logs: LogRecord[]) => {
			console.log(Events.GET_ALL_LOG_RECORDS, logs);
			this._appDispatch(setLogs(logs));
		});
		this._socket.on(Events.GET_LOG_RECORD, (logRecord: LogRecord) => {
			console.log(Events.GET_LOG_RECORD, logRecord);
			this._appDispatch(addLogRecord(logRecord));
		});
		this._socket.on(Events.GET_CARD, (card: FieldCard) => {
			console.log(Events.GET_CARD, card);
			this._appDispatch(setCard(card));
		});
		this._socket.on(Events.GET_TIMER, (timer: Timer) => {
			console.log(Events.GET_TIMER, timer);
			this._appDispatch(setTimer(timer));
		});
		this._socket.on(Events.GET_ROOM_OPTIONS, (roomOptions: RoomOptions) => {
			console.log(Events.GET_ROOM_OPTIONS, roomOptions);
			this._appDispatch(setRoomOptions(roomOptions));
		});
		this._socket.on(Events.GET_LAST_WINNER, (lastWinner: string) => {
			console.log(Events.GET_LAST_WINNER, lastWinner);
			this._appDispatch(setLastWinner(lastWinner));
		});
		this._socket.on(Events.GET_ACT_CARD_IDS, (ids: number[]) => {
			console.log(Events.GET_ACT_CARD_IDS, ids);
			this._appDispatch(addActCardIds(ids));
		});
		this._socket.on(Events.GET_NICKNAME, ({ nickname, force } : { nickname: string, force: boolean }) => {
			console.log(Events.GET_NICKNAME, nickname);
			if (force) {
				localStorage.setItem('nickname', nickname);
				this._appDispatch(setNickname(nickname));
				return;
			}
			const nick = localStorage.getItem('nickname');
			if (!nick) {
				this._appDispatch(setNickname(nickname));
			} else {
				this._socket?.emit(Events.CHANGE_NICKNAME, nick, (flag: boolean) => {
					this._appDispatch(setNickname(flag ? nick : nickname));
				});
			}
		});
	}

	describe () {
		this._socket?.disconnect();
		this._appDispatch(clearStoreAfterLeaving());
		delete this._socket;
	}

	async createRoom(roomOptions: RoomOptions): Promise<string> {
		return new Promise(resolve => {
			if (!this._socket) return resolve('');
			console.log(Events.CREATE_ROOM);
			this._socket.emit(Events.CREATE_ROOM, roomOptions, (roomId: string) => {
				resolve(roomId);
			});
		});
	}

	async checkRoom(roomId: string) : Promise<boolean> {
		return new Promise(resolve => {
			if (!this._socket) return resolve(false);
			console.log(Events.CHECK_ROOM, roomId);
			this._socket.emit(Events.CHECK_ROOM, roomId, (flag: boolean) => {
				resolve(flag);
			});
		});
	}

	async joinRoom(roomId: string) : Promise<boolean> {
		return new Promise(resolve => {
			if (!this._socket) return resolve(false);
			console.log(Events.JOIN_ROOM, roomId);
			this._socket.emit(Events.JOIN_ROOM, roomId, (flag: boolean) => {
				resolve(flag);
			});
		});
	}

	requestRoomOptions() {
		if (!this._socket) return;
		console.log(Events.REQUEST_ROOM_OPTIONS);
		this._socket.emit(Events.REQUEST_ROOM_OPTIONS);
	}

	become(becomePlayer: boolean) {
		if (!this._socket) return;
		console.log(Events.BECOME, becomePlayer);
		this._socket.emit(Events.BECOME, becomePlayer, (flag: boolean) => {
			if (flag) this._appDispatch(setIAmPlayerFlag(becomePlayer));
		});
	}

	moveCards(movement: MovementDto) {
		if (!this._socket) return;
		console.log(Events.MOVE_CARDS, movement);
		this._socket.emit(Events.MOVE_CARDS, movement);
	}

	leaveRoom() {
		console.log(Events.LEAVE_ROOM);
		if (!this._socket) return;
		this._socket.emit(Events.LEAVE_ROOM, undefined, () => {
			this._appDispatch(clearStoreAfterLeaving());
		});
	}

	startGame(ownerKey: string) {
		if (!this._socket) return;
		console.log(Events.START_GAME, ownerKey);
		this._socket.emit(Events.START_GAME, ownerKey);
	}

	pauseGame(ownerKey: string) {
		if (!this._socket) return;
		console.log(Events.PAUSE_GAME, ownerKey);
		this._socket.emit(Events.PAUSE_GAME, ownerKey);
	}

	requestTimer() {
		if (!this._socket) return;
		console.log(Events.REQUEST_TIMER);
		this._socket.emit(Events.REQUEST_TIMER);
	}

	resumeGame(ownerKey: string) {
		if (!this._socket) return;
		console.log(Events.RESUME_GAME, ownerKey);
		this._socket.emit(Events.RESUME_GAME, ownerKey);
	}

	stopGame(ownerKey: string) {
		if (!this._socket) return;
		console.log(Events.STOP_GAME, ownerKey);
		this._socket.emit(Events.STOP_GAME, ownerKey);
	}

	captureCard(cardId: number) {
		if (!this._socket) return;
		console.log(Events.CAPTURE_CARD, cardId);
		this._socket.emit(Events.CAPTURE_CARD, cardId);
	}

	askCard(cardId: number) {
		if (!this._socket) return;
		console.log(Events.ASK_CARD, cardId);
		this._socket.emit(Events.ASK_CARD, cardId);
	}

	async changeRoomOptions(ownerKey: string, roomOptions: RoomOptions) : Promise<boolean> {
		return new Promise(resolve => {
			if (!this._socket) return resolve(false);
			const optionsDto: OptionsDto = { options: roomOptions, ownerKey };
			console.log(Events.CHANGE_ROOM_OPTIONS, optionsDto);
			this._socket.emit(Events.CHANGE_ROOM_OPTIONS, optionsDto, (flag: boolean) => {
				resolve(flag);
			});
		});
	}

	async changeNickname(nickname: string) : Promise<string> {
		return new Promise(resolve => {
			if (!this._socket) return resolve('');
			console.log(Events.CHANGE_NICKNAME, nickname);
			this._socket.emit(Events.CHANGE_NICKNAME, nickname, (nickname: string) => {
				if (nickname) {
					this._appDispatch(setNickname(nickname));
					localStorage.setItem('nickname', nickname);
				}
				resolve(nickname);
			});
		});
	}
}

const api = new Api(store.dispatch);
export const useApi = () => (api);