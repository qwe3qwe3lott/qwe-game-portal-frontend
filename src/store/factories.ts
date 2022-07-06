import {GameState} from './types';
import {$CombinedState, createSelector, PayloadAction} from '@reduxjs/toolkit';
import {LogRecord} from '../types/LogRecord';
import {Member} from '../types/Member';
import {Timer} from '../types/Timer';
import {GamePlayer} from '../types/GamePlayer';
import {RootState} from './index';
import {GameRoomStatus} from '../types/GameRoomStatus';
import {MembersRestriction} from '../types/MembersRestriction';
import {GameRoomOptions} from '../types/GameRoomOptions';

export const getGameInitialState = <P extends GamePlayer, S extends GameRoomStatus, O extends GameRoomOptions>(options: O): GameState<P, S, O> => ({
	ownerKey: '',
	members: [],
	membersRestriction: { min: 2, max: 8 },
	iAmPlayer: false,
	players: [],
	restrictionsToStart: [],
	iAmActing: false,
	roomStatus: 'idle' as S,
	timer: { currentTime: 0, maxTime: 0 },
	logs: [],
	roomOptions: options
});

export const getGameReducers = <P extends GamePlayer, S extends GameState<P, R, O>, R extends GameRoomStatus, O extends GameRoomOptions>() => ({
	setPlayers(state: S, action: PayloadAction<P[]>) { state.players = action.payload; },
	setLogs: (state: S, action: PayloadAction<LogRecord[]>) => { state.logs = action.payload; },
	addLogRecord: (state: S, action: PayloadAction<LogRecord>) => { state.logs.unshift(action.payload); },
	setMembers: (state: S, action: PayloadAction<Member[]>) => { state.members = action.payload; },
	setOwnerKey: (state: S, action: PayloadAction<string>) => { state.ownerKey = action.payload; },
	setIAmPlayerFlag: (state: S, action: PayloadAction<boolean>) => { state.iAmPlayer = action.payload; },
	setIAmActingFlag: (state: S, action: PayloadAction<boolean>) => { state.iAmActing = action.payload; },
	setTimer: (state: S, action: PayloadAction<Timer>) => { state.timer = action.payload; },
	setRestrictionsToStart: (state: S, action: PayloadAction<string[]>) => { state.restrictionsToStart = action.payload; },
	setRoomOptions: (state: S, action: PayloadAction<O>) => {
		state.roomOptions = action.payload;
		state.membersRestriction.min = action.payload.minPlayers;
		state.membersRestriction.max = action.payload.maxPlayers;
	},
	setOptionMinPlayers(state: S, action: PayloadAction<number>) { state.roomOptions.minPlayers = action.payload; },
	setOptionMaxPlayers(state: S, action: PayloadAction<number>) { state.roomOptions.maxPlayers = action.payload; }
});

export const getGameSelectors = <M extends keyof Omit<Omit<RootState, typeof $CombinedState>, 'app'>, P extends GamePlayer, O extends GameRoomOptions>(module: M) => {
	const selectRoomOptions = (state: RootState): O => state[module].roomOptions as O;
	const selectRoomMinPlayers = (state: RootState): number => state[module].roomOptions.minPlayers;
	const selectRoomMaxPlayers = (state: RootState): number => state[module].roomOptions.maxPlayers;
	const selectOwnerKey = (state: RootState): string => state[module].ownerKey;
	const selectGameIsRunning = (state: RootState): boolean => state[module].roomStatus === 'run' || state[module].roomStatus === 'pause';
	const selectGameIsOnPause = (state: RootState): boolean => state[module].roomStatus === 'pause';
	const selectTimer = (state: RootState): Timer => state[module].timer;
	const selectIAmActing = (state: RootState): boolean => state[module].iAmActing;
	const selectIAmPlayer = (state: RootState): boolean => state[module].iAmPlayer;
	const selectMembers = (state: RootState): Member[] => state[module].members;
	const selectRestrictionsToStart = (state: RootState): string[] => state[module].restrictionsToStart;
	const selectMembersRestriction = (state: RootState): MembersRestriction => state[module].membersRestriction;
	const selectLogs = (state: RootState): LogRecord[] => state[module].logs;
	const selectPlayers = (state: RootState): P[] => state[module].players as P[];
	const computePlayersAmongMembers = createSelector(
		[selectMembers],
		(members) => {
			return members.filter(member => member.isPlayer);
		}
	);
	const computeMembersRestriction = createSelector(
		[computePlayersAmongMembers, selectMembersRestriction],
		(members, membersRestriction) => {
			return `${members.length} из ${membersRestriction.min === membersRestriction.max ? membersRestriction.min : `${membersRestriction.min}-${membersRestriction.max}`}`;
		}
	);
	const computeLastLogs = createSelector(
		[selectLogs],
		(logs) => {
			return logs.slice(0, Math.min(logs.length, 10));
		}
	);
	const computeCurrentPlayer = createSelector(
		[selectPlayers],
		(players) => {
			return players.length > 0 ? players[0] : undefined;
		}
	);
	return {selectOwnerKey, selectGameIsRunning, selectGameIsOnPause, selectTimer, selectIAmActing, selectIAmPlayer,
		selectMembers, selectRestrictionsToStart, selectMembersRestriction, selectLogs, selectPlayers, computePlayersAmongMembers,
		computeMembersRestriction, computeLastLogs, computeCurrentPlayer, selectRoomOptions, selectRoomMinPlayers, selectRoomMaxPlayers};
};