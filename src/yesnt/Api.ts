import {GameApi} from '../abstracts/GameApi';
import store, {AppDispatch, setNickname} from '../store';
import {routePath} from '../spy/Router';
import {
	addLogRecord,
	setIAmActingFlag, setIAmPlayerFlag,
	setLogs,
	setMembers,
	setOwnerKey,
	setRestrictionsToStart,
	setRoomStatus, setTimer
} from './store';
import {GameEvents} from '../enums/GameEvents';
import {Player} from '../spy/types/Player';

export class Api extends GameApi {
	constructor(appDispatch: AppDispatch) { super(appDispatch, setIAmPlayerFlag, setNickname); }

	public subscribe(): void {
		this._socket = GameApi.createSocket(routePath);
		this.superSubscribe(setMembers, setOwnerKey, setRoomStatus, setRestrictionsToStart, setIAmActingFlag, setLogs, addLogRecord, setTimer, setNickname);
		this._socket.on(GameEvents.GET_PLAYERS, (players: Player[]) => {
			console.log(GameEvents.GET_PLAYERS, players);
			// this._appDispatch(setPlayers(players));
		});
	}
}

const api = new Api(store.dispatch);
export const useApi = () => (api);