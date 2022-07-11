import store, {AppDispatch, setNickname} from '../store';
import {Events} from './enums/Events';
import {
	addActCardIds,
	addLogRecord,
	setCard,
	setFieldCards, setGameIsOnPauseFlag, setIAmActingFlag,
	setIAmPlayerFlag, setLastWinner, setLogs,
	setMembers, setOptionsOfCards,
	setOwnerKey,
	setPlayers, setRestrictionsToStart, setRoomOptions, setRoomStatus, setSizes, setTimer
} from './store';
import {Player} from './types/Player';
import {FieldCard} from './types/FieldCard';
import {MovementDto} from './dto/MovementDto';
import {Sizes} from './types/Sizes';
import {RoomOptions} from './types/RoomOptions';
import {OptionsOfCardsDto} from './dto/OptionsOfCardsDto';
import {GameApi} from '../abstracts/GameApi';
import {routePath} from './Router';
import {CardOptions} from './types/CardOptions';
import {RoomStatus} from './types/RoomStatus';

export class Api extends GameApi<Player, RoomStatus, RoomOptions> {
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
	constructor(appDispatch: AppDispatch) { super(appDispatch, setIAmPlayerFlag, setNickname); }

	public subscribe(): void {
		this._socket = GameApi.createSocket(routePath);
		this.superSubscribe(setMembers, setOwnerKey, setRoomStatus, setRestrictionsToStart, setIAmActingFlag,
			setLogs, addLogRecord, setTimer, setNickname, setPlayers, setRoomOptions, setGameIsOnPauseFlag);
		this._socket.on(Events.GET_FIELD_CARDS, (fieldCards: FieldCard[]) => {
			console.log(Events.GET_FIELD_CARDS, fieldCards);
			this._appDispatch(setFieldCards(fieldCards));
		});
		this._socket.on(Events.GET_SIZES, (sizes: Sizes) => {
			console.log(Events.GET_SIZES, sizes);
			this._appDispatch(setSizes(sizes));
		});
		this._socket.on(Events.GET_CARD, (card: FieldCard) => {
			console.log(Events.GET_CARD, card);
			this._appDispatch(setCard(card));
		});
		this._socket.on(Events.GET_ROOM_OPTIONS_OF_CARDS, (optionsOfCards: CardOptions[]) => {
			console.log(Events.GET_ROOM_OPTIONS_OF_CARDS, optionsOfCards);
			this._appDispatch(setOptionsOfCards(optionsOfCards));
		});
		this._socket.on(Events.GET_LAST_WINNER, (lastWinner: string) => {
			console.log(Events.GET_LAST_WINNER, lastWinner);
			this._appDispatch(setLastWinner(lastWinner));
		});
		this._socket.on(Events.GET_ACT_CARD_IDS, (ids: number[]) => {
			console.log(Events.GET_ACT_CARD_IDS, ids);
			this._appDispatch(addActCardIds(ids));
		});
	}

	public requestOptionsOfCards() {
		console.log(Events.REQUEST_ROOM_OPTIONS_OF_CARDS);
		this._socket?.emit(Events.REQUEST_ROOM_OPTIONS_OF_CARDS);
	}

	public moveCards(movement: MovementDto) {
		console.log(Events.MOVE_CARDS, movement);
		this._socket?.emit(Events.MOVE_CARDS, movement);
	}

	public captureCard(cardId: number) {
		console.log(Events.CAPTURE_CARD, cardId);
		this._socket?.emit(Events.CAPTURE_CARD, cardId);
	}

	public askCard(cardId: number) {
		console.log(Events.ASK_CARD, cardId);
		this._socket?.emit(Events.ASK_CARD, cardId);
	}

	public async changeRoomOptionsOfCards(ownerKey: string, optionsOfCards: CardOptions[]) : Promise<boolean> {
		return new Promise(resolve => {
			if (!this._socket) return resolve(false);
			const optionsOfCardsDto: OptionsOfCardsDto = { optionsOfCards, ownerKey };
			console.log(Events.CHANGE_ROOM_OPTIONS_OF_CARDS, optionsOfCardsDto);
			this._socket.emit(Events.CHANGE_ROOM_OPTIONS_OF_CARDS, optionsOfCardsDto, (flag: boolean) => {
				resolve(flag);
			});
		});
	}
}

const api = new Api(store.dispatch);
export const useApi = () => (api);