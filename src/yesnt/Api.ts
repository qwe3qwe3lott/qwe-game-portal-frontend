import {GameApi} from '../abstracts/GameApi';
import store, {AppDispatch, setNickname} from '../store';
import {routePath} from './Router';
import {
	addLogRecord,
	setIAmActingFlag, setIAmPlayerFlag,
	setLogs,
	setMembers,
	setOwnerKey, setPlayers,
	setRestrictionsToStart, setRoomOptions,
	setRoomStatus, setTimer
} from './store';
import {Player} from './types/Player';
import {RoomStatus} from './types/RoomStatus';
import {RoomOptions} from './types/RoomOptions';

export class Api extends GameApi<Player, RoomStatus, RoomOptions> {
	constructor(appDispatch: AppDispatch) { super(appDispatch, setIAmPlayerFlag, setNickname); }

	public subscribe(): void {
		this._socket = GameApi.createSocket(routePath);
		this.superSubscribe(setMembers, setOwnerKey, setRoomStatus, setRestrictionsToStart,
			setIAmActingFlag, setLogs, addLogRecord, setTimer, setNickname, setPlayers, setRoomOptions);
	}
}

const api = new Api(store.dispatch);
export const useApi = () => (api);