import {GameApi} from '../abstracts/GameApi';
import store, {AppDispatch, setNickname} from '../store';
import {routePath} from '../spy/Router';
import {
	addLogRecord,
	setIAmActingFlag, setIAmPlayerFlag,
	setLogs,
	setMembers,
	setOwnerKey, setPlayers,
	setRestrictionsToStart,
	setRoomStatus, setTimer
} from './store';
import {Player} from './types/Player';

export class Api extends GameApi<Player> {
	constructor(appDispatch: AppDispatch) { super(appDispatch, setIAmPlayerFlag, setNickname); }

	public subscribe(): void {
		this._socket = GameApi.createSocket(routePath);
		this.superSubscribe(setMembers, setOwnerKey, setRoomStatus, setRestrictionsToStart, setIAmActingFlag, setLogs, addLogRecord, setTimer, setNickname, setPlayers);
	}
}

const api = new Api(store.dispatch);
export const useApi = () => (api);