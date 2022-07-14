import {GameState} from './types';
import {$CombinedState, createSelector, PayloadAction} from '@reduxjs/toolkit';
import {LogRecord} from '../types/LogRecord';
import {Member} from '../types/Member';
import {Timer} from '../types/Timer';
import {GamePlayer} from '../types/GamePlayer';
import {RootState} from './index';
import {MembersRestriction} from '../types/MembersRestriction';
import {GameRoomOptions} from '../types/GameRoomOptions';

export const getGameInitialState =
	<PLAYER extends GamePlayer, STATUS extends string, OPTIONS extends GameRoomOptions>(options: OPTIONS, initialStatus: STATUS): GameState<PLAYER, STATUS, OPTIONS> => ({
		ownerKey: '',
		members: [],
		membersRestriction: { min: 2, max: 8 },
		iAmPlayer: false,
		players: [],
		restrictionsToStart: [],
		iAmActing: false,
		roomStatus: initialStatus,
		timer: { currentTime: 0, maxTime: 0 },
		logs: [],
		roomOptions: options,
		gameIsOnPause: false
	});

export const getGameReducers = <PLAYER extends GamePlayer, STATE extends GameState<PLAYER, STATUS, OPTIONS>, STATUS extends string, OPTIONS extends GameRoomOptions>() => ({
	setPlayers(state: STATE, action: PayloadAction<PLAYER[]>) { state.players = action.payload; },
	setLogs: (state: STATE, action: PayloadAction<LogRecord[]>) => { state.logs = action.payload; },
	addLogRecord: (state: STATE, action: PayloadAction<LogRecord>) => { state.logs.unshift(action.payload); },
	setMembers: (state: STATE, action: PayloadAction<Member[]>) => { state.members = action.payload; },
	setOwnerKey: (state: STATE, action: PayloadAction<string>) => { state.ownerKey = action.payload; },
	setIAmPlayerFlag: (state: STATE, action: PayloadAction<boolean>) => { state.iAmPlayer = action.payload; },
	setIAmActingFlag: (state: STATE, action: PayloadAction<boolean>) => { state.iAmActing = action.payload; },
	setGameIsOnPauseFlag: (state: STATE, action: PayloadAction<boolean>) => { state.gameIsOnPause = action.payload; },
	setTimer: (state: STATE, action: PayloadAction<Timer>) => { state.timer = action.payload; },
	setRestrictionsToStart: (state: STATE, action: PayloadAction<string[]>) => { state.restrictionsToStart = action.payload; },
	setRoomOptions: (state: STATE, action: PayloadAction<OPTIONS>) => {
		state.roomOptions = action.payload;
		state.membersRestriction.min = action.payload.minPlayers;
		state.membersRestriction.max = action.payload.maxPlayers;
	},
	setOptionMinPlayers(state: STATE, action: PayloadAction<number>) { state.roomOptions.minPlayers = action.payload; },
	setOptionMaxPlayers(state: STATE, action: PayloadAction<number>) { state.roomOptions.maxPlayers = action.payload; }
});

export const getGameSelectors =
	<MODULE extends keyof Omit<Omit<RootState, typeof $CombinedState>, 'app'>, PLAYER extends GamePlayer, OPTIONS extends GameRoomOptions>(module: MODULE) => {
		const selectRoomOptions = (state: RootState): OPTIONS => state[module].roomOptions as unknown as OPTIONS;
		const selectRoomMinPlayers = (state: RootState): number => state[module].roomOptions.minPlayers;
		const selectRoomMaxPlayers = (state: RootState): number => state[module].roomOptions.maxPlayers;
		const selectOwnerKey = (state: RootState): string => state[module].ownerKey;
		const selectGameIsOnPause = (state: RootState): boolean => state[module].gameIsOnPause;
		const selectTimer = (state: RootState): Timer => state[module].timer;
		const selectIAmActing = (state: RootState): boolean => state[module].iAmActing;
		const selectIAmPlayer = (state: RootState): boolean => state[module].iAmPlayer;
		const selectMembers = (state: RootState): Member[] => state[module].members;
		const selectRestrictionsToStart = (state: RootState): string[] => state[module].restrictionsToStart;
		const selectMembersRestriction = (state: RootState): MembersRestriction => state[module].membersRestriction;
		const selectLogs = (state: RootState): LogRecord[] => state[module].logs;
		const selectPlayers = (state: RootState): PLAYER[] => state[module].players as PLAYER[];
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
		return {selectOwnerKey, selectGameIsOnPause, selectTimer, selectIAmActing, selectIAmPlayer,
			selectMembers, selectRestrictionsToStart, selectMembersRestriction, selectLogs, selectPlayers, computePlayersAmongMembers,
			computeMembersRestriction, computeLastLogs, computeCurrentPlayer, selectRoomOptions, selectRoomMinPlayers, selectRoomMaxPlayers};
	};