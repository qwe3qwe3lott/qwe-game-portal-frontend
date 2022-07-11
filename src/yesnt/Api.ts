import {GameApi} from '../abstracts/GameApi';
import store, {AppDispatch, setNickname} from '../store';
import {routePath} from './Router';
import {
	addLogRecord, setAnswer, setGameIsOnPauseFlag,
	setIAmActingFlag, setIAmPlayerFlag,
	setLogs,
	setMembers,
	setOwnerKey, setPlayers, setQuestion,
	setRestrictionsToStart, setResult, setRoomOptions,
	setRoomStatus, setTimer
} from './store';
import {Player} from './types/Player';
import {RoomStatus} from './types/RoomStatus';
import {RoomOptions} from './types/RoomOptions';
import {Events} from './enums/Events';
import {Answers} from './enums/Answers';
import {Result} from './types/Result';

export class Api extends GameApi<Player, RoomStatus, RoomOptions> {
	public static readonly MIN_MIN_PLAYERS = 2;
	public static readonly MAX_MIN_PLAYERS = 8;
	public static readonly MIN_MAX_PLAYERS = 2;
	public static readonly MAX_MAX_PLAYERS = 8;
	public static readonly MIN_SECONDS_TO_ASK = 15;
	public static readonly MAX_SECONDS_TO_ASK = 180;
	public static readonly MIN_SECONDS_TO_ANSWER = 15;
	public static readonly MAX_SECONDS_TO_ANSWER = 180;
	constructor(appDispatch: AppDispatch) { super(appDispatch, setIAmPlayerFlag, setNickname); }

	public subscribe(): void {
		this._socket = GameApi.createSocket(routePath);
		this.superSubscribe(setMembers, setOwnerKey, setRoomStatus, setRestrictionsToStart,
			setIAmActingFlag, setLogs, addLogRecord, setTimer, setNickname, setPlayers, setRoomOptions, setGameIsOnPauseFlag);
		this._socket?.on(Events.GET_QUESTION, (question: string) => {
			console.log(Events.GET_QUESTION, question);
			this._appDispatch(setQuestion(question));
		});
		this._socket?.on(Events.GET_ANSWER, (answer: Answers) => {
			console.log(Events.GET_ANSWER, answer);
			this._appDispatch(setAnswer(answer));
		});
		this._socket?.on(Events.GET_RESULT, (result: Result) => {
			console.log(Events.GET_RESULT, result);
			this._appDispatch(setResult(result));
		});
	}

	public ask(question: string) {
		console.log(Events.ASK, question);
		this._socket?.emit(Events.ASK, question);
	}

	public skipAsk() {
		console.log(Events.SKIP_ASK);
		this._socket?.emit(Events.SKIP_ASK);
	}

	public answer(answer: Answers) {
		console.log(Events.ANSWER, answer);
		this._socket?.emit(Events.ANSWER, answer);
	}
}

const api = new Api(store.dispatch);
export const useApi = () => (api);