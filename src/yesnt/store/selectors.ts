import {getGameSelectors} from '../../store/factories';
import {Player} from '../types/Player';
import {RoomOptions} from '../types/RoomOptions';


export const {selectOwnerKey, selectGameIsRunning, selectGameIsOnPause, selectIAmActing, selectIAmPlayer, selectTimer,
	selectMembers, selectMembersRestriction, selectRestrictionsToStart, selectPlayers, selectLogs,
	computeMembersRestriction, computePlayersAmongMembers, computeCurrentPlayer, computeLastLogs, selectRoomOptions,
	selectRoomMaxPlayers, selectRoomMinPlayers} = getGameSelectors<'yesnt', Player, RoomOptions>('yesnt');