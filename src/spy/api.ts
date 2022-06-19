import {io, Socket} from 'socket.io-client';
import store, {AppDispatch} from '../store';
import {SpyWSEvents} from './enums/SpyWSEvents';
import {Member} from './types/Member';
import {
	addActCardIds,
	addLogRecord,
	clearStoreAfterLeaving, setCard,
	setFieldCards, setIAmActingFlag,
	setIAmPlayerFlag, setIsOnPauseFlag,
	setIsRunningFlag, setLastWinner, setLogs,
	setMembers, setNickname,
	setOwnerKey,
	setPlayers, setRoomOptions, setSizes, setStartConditionFlag, setTimer
} from './store';
import {Player} from './types/Player';
import {FieldCard} from './types/FieldCard';
import {MovementDto} from './dto/MovementDto';
import {Timer} from './types/Timer';
import {LogRecord} from './types/LogRecord';
import {Sizes} from './types/Sizes';
import {RoomOptions} from './types/RoomOptions';
import {OptionsDto} from './dto/OptionsDto';

class Api {
	public readonly MIN_MIN_PLAYERS = 2;
	public readonly MAX_MIN_PLAYERS = 8;
	public readonly MIN_MAX_PLAYERS = 2;
	public readonly MAX_MAX_PLAYERS = 8;
	public readonly MIN_ROWS = 3;
	public readonly MAX_ROWS = 7;
	public readonly MIN_COLUMNS = 3;
	public readonly MAX_COLUMNS = 7;
	public readonly MIN_SECONDS_TO_ACT = 15;
	public readonly MAX_SECONDS_TO_ACT = 180;
	public readonly MIN_WIN_SCORE = 1;
	public readonly MAX_WIN_SCORE = 5;
	private _socket?: Socket;
	get socket() { return this._socket; }
	private readonly _appDispatch: AppDispatch;
	constructor(appDispatch: AppDispatch) {
    	this._appDispatch = appDispatch;
	}

	subscribe(): void {
		this._socket = io(`${process.env.REACT_APP_BACKEND_URL}/spy` ?? '');
		this._socket.on(SpyWSEvents.GET_MEMBERS, (members: Member[]) => {
			console.log(SpyWSEvents.GET_MEMBERS, members);
			this._appDispatch(setMembers(members));
		});
		this._socket.on(SpyWSEvents.GET_OWNER_KEY, (ownerKey: string) => {
			console.log(SpyWSEvents.GET_OWNER_KEY, ownerKey);
			this._appDispatch(setOwnerKey(ownerKey));
		});
		this._socket.on(SpyWSEvents.GET_PLAYERS, (players: Player[]) => {
			console.log(SpyWSEvents.GET_PLAYERS, players);
			this._appDispatch(setPlayers(players));
		});
		this._socket.on(SpyWSEvents.GET_FIELD_CARDS, (fieldCards: FieldCard[]) => {
			console.log(SpyWSEvents.GET_FIELD_CARDS, fieldCards);
			this._appDispatch(setFieldCards(fieldCards));
		});
		this._socket.on(SpyWSEvents.GET_RUNNING_FLAG, (flag: boolean) => {
			console.log(SpyWSEvents.GET_RUNNING_FLAG, flag);
			this._appDispatch(setIsRunningFlag(flag));
		});
		this._socket.on(SpyWSEvents.GET_START_CONDITION_FLAG, (flag: boolean) => {
			console.log(SpyWSEvents.GET_START_CONDITION_FLAG, flag);
			this._appDispatch(setStartConditionFlag(flag));
		});
		this._socket.on(SpyWSEvents.GET_ACT_FLAG, (flag: boolean) => {
			console.log(SpyWSEvents.GET_ACT_FLAG, flag);
			this._appDispatch(setIAmActingFlag(flag));
		});
		this._socket.on(SpyWSEvents.GET_PAUSE_FLAG, (flag: boolean) => {
			console.log(SpyWSEvents.GET_PAUSE_FLAG, flag);
			this._appDispatch(setIsOnPauseFlag(flag));
		});
		this._socket.on(SpyWSEvents.GET_SIZES, (sizes: Sizes) => {
			console.log(SpyWSEvents.GET_SIZES, sizes);
			this._appDispatch(setSizes(sizes));
		});
		this._socket.on(SpyWSEvents.GET_ALL_LOG_RECORDS, (logs: LogRecord[]) => {
			console.log(SpyWSEvents.GET_ALL_LOG_RECORDS, logs);
			this._appDispatch(setLogs(logs));
		});
		this._socket.on(SpyWSEvents.GET_LOG_RECORD, (logRecord: LogRecord) => {
			console.log(SpyWSEvents.GET_LOG_RECORD, logRecord);
			this._appDispatch(addLogRecord(logRecord));
		});
		this._socket.on(SpyWSEvents.GET_CARD, (card: FieldCard) => {
			console.log(SpyWSEvents.GET_CARD, card);
			this._appDispatch(setCard(card));
		});
		this._socket.on(SpyWSEvents.GET_TIMER, (timer: Timer) => {
			console.log(SpyWSEvents.GET_TIMER, timer);
			this._appDispatch(setTimer(timer));
		});
		this._socket.on(SpyWSEvents.GET_ROOM_OPTIONS, (roomOptions: RoomOptions) => {
			console.log(SpyWSEvents.GET_ROOM_OPTIONS, roomOptions);
			this._appDispatch(setRoomOptions(roomOptions));
		});
		this._socket.on(SpyWSEvents.GET_LAST_WINNER, (lastWinner: string) => {
			console.log(SpyWSEvents.GET_LAST_WINNER, lastWinner);
			this._appDispatch(setLastWinner(lastWinner));
		});
		this._socket.on(SpyWSEvents.GET_ACT_CARD_IDS, (ids: number[]) => {
			console.log(SpyWSEvents.GET_ACT_CARD_IDS, ids);
			this._appDispatch(addActCardIds(ids));
		});
		this._socket.on(SpyWSEvents.GET_NICKNAME, ({ nickname, force } : { nickname: string, force: boolean }) => {
			console.log(SpyWSEvents.GET_NICKNAME, nickname);
			if (force) {
				localStorage.setItem('nickname', nickname);
				this._appDispatch(setNickname(nickname));
				return;
			}
			const nick = localStorage.getItem('nickname');
			if (!nick) {
				this._appDispatch(setNickname(nickname));
			} else {
				this._socket?.emit(SpyWSEvents.CHANGE_NICKNAME, nick, (flag: boolean) => {
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
			console.log(SpyWSEvents.CREATE_ROOM);
			this._socket.emit(SpyWSEvents.CREATE_ROOM, roomOptions, (roomId: string) => {
				resolve(roomId);
			});
		});
	}

	async checkRoom(roomId: string) : Promise<boolean> {
		return new Promise(resolve => {
			if (!this._socket) return resolve(false);
			console.log(SpyWSEvents.CHECK_ROOM, roomId);
			this._socket.emit(SpyWSEvents.CHECK_ROOM, roomId, (flag: boolean) => {
				resolve(flag);
			});
		});
	}

	async joinRoom(roomId: string) : Promise<boolean> {
		return new Promise(resolve => {
			if (!this._socket) return resolve(false);
			console.log(SpyWSEvents.JOIN_ROOM, roomId);
			this._socket.emit(SpyWSEvents.JOIN_ROOM, roomId, (flag: boolean) => {
				resolve(flag);
			});
		});
	}

	requestRoomOptions() {
		if (!this._socket) return;
		console.log(SpyWSEvents.REQUEST_ROOM_OPTIONS);
		this._socket.emit(SpyWSEvents.REQUEST_ROOM_OPTIONS);
	}

	become(becomePlayer: boolean) {
		if (!this._socket) return;
		console.log(SpyWSEvents.BECOME, becomePlayer);
		this._socket.emit(SpyWSEvents.BECOME, becomePlayer, (flag: boolean) => {
			if (flag) this._appDispatch(setIAmPlayerFlag(becomePlayer));
		});
	}

	moveCards(movement: MovementDto) {
		if (!this._socket) return;
		console.log(SpyWSEvents.MOVE_CARDS, movement);
		this._socket.emit(SpyWSEvents.MOVE_CARDS, movement);
	}

	leaveRoom() {
		console.log(SpyWSEvents.LEAVE_ROOM);
		if (!this._socket) return;
		this._socket.emit(SpyWSEvents.LEAVE_ROOM, undefined, () => {
			this._appDispatch(clearStoreAfterLeaving());
		});
	}

	startGame(ownerKey: string) {
		if (!this._socket) return;
		console.log(SpyWSEvents.START_GAME, ownerKey);
		this._socket.emit(SpyWSEvents.START_GAME, ownerKey);
	}

	pauseGame(ownerKey: string) {
		if (!this._socket) return;
		console.log(SpyWSEvents.PAUSE_GAME, ownerKey);
		this._socket.emit(SpyWSEvents.PAUSE_GAME, ownerKey);
	}

	requestTimer() {
		if (!this._socket) return;
		console.log(SpyWSEvents.REQUEST_TIMER);
		this._socket.emit(SpyWSEvents.REQUEST_TIMER);
	}

	resumeGame(ownerKey: string) {
		if (!this._socket) return;
		console.log(SpyWSEvents.RESUME_GAME, ownerKey);
		this._socket.emit(SpyWSEvents.RESUME_GAME, ownerKey);
	}

	stopGame(ownerKey: string) {
		if (!this._socket) return;
		console.log(SpyWSEvents.STOP_GAME, ownerKey);
		this._socket.emit(SpyWSEvents.STOP_GAME, ownerKey);
	}

	captureCard(cardId: number) {
		if (!this._socket) return;
		console.log(SpyWSEvents.CAPTURE_CARD, cardId);
		this._socket.emit(SpyWSEvents.CAPTURE_CARD, cardId);
	}

	askCard(cardId: number) {
		if (!this._socket) return;
		console.log(SpyWSEvents.ASK_CARD, cardId);
		this._socket.emit(SpyWSEvents.ASK_CARD, cardId);
	}

	async changeRoomOptions(ownerKey: string, roomOptions: RoomOptions) : Promise<boolean> {
		return new Promise(resolve => {
			if (!this._socket) return resolve(false);
			const optionsDto: OptionsDto = { options: roomOptions, ownerKey };
			console.log(SpyWSEvents.CHANGE_ROOM_OPTIONS, optionsDto);
			this._socket.emit(SpyWSEvents.CHANGE_ROOM_OPTIONS, optionsDto, (flag: boolean) => {
				resolve(flag);
			});
		});
	}

	async changeNickname(nickname: string) : Promise<string> {
		return new Promise(resolve => {
			if (!this._socket) return resolve('');
			console.log(SpyWSEvents.CHANGE_NICKNAME, nickname);
			this._socket.emit(SpyWSEvents.CHANGE_NICKNAME, nickname, (nickname: string) => {
				if (nickname) {
					this._appDispatch(setNickname(nickname));
					localStorage.setItem('nickname', nickname);
				}
				resolve(nickname);
			});
		});
	}
}

const spyAPI = new Api(store.dispatch);
export default spyAPI;