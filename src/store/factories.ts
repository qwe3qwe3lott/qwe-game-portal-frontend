import {GameState} from './types';
import {RoomStatuses} from '../enums/RoomStatuses';
import {$CombinedState, PayloadAction} from '@reduxjs/toolkit';
import {LogRecord} from '../types/LogRecord';
import {Member} from '../types/Member';
import {Timer} from '../types/Timer';
import {GamePlayer} from '../types/GamePlayer';
import {RootState} from './index';

export const getGameInitialState = <P extends GamePlayer>(): GameState<P> => ({
	ownerKey: '',
	members: [],
	iAmPlayer: false,
	players: [],
	restrictionsToStart: [],
	iAmActing: false,
	roomStatus: RoomStatuses.IDLE,
	timer: { currentTime: 0, maxTime: 0 },
	logs: []
});

export const getGameReducers = <P extends GamePlayer, S extends GameState<P>>() => ({
	setPlayers(state: S, action: PayloadAction<P[]>) { state.players = action.payload; },
	setLogs: (state: S, action: PayloadAction<LogRecord[]>) => { state.logs = action.payload; },
	addLogRecord: (state: S, action: PayloadAction<LogRecord>) => { state.logs.unshift(action.payload); },
	setMembers: (state: S, action: PayloadAction<Member[]>) => { state.members = action.payload; },
	setOwnerKey: (state: S, action: PayloadAction<string>) => { state.ownerKey = action.payload; },
	setIAmPlayerFlag: (state: S, action: PayloadAction<boolean>) => { state.iAmPlayer = action.payload; },
	setIAmActingFlag: (state: S, action: PayloadAction<boolean>) => { state.iAmActing = action.payload; },
	setTimer: (state: S, action: PayloadAction<Timer>) => { state.timer = action.payload; },
	setRestrictionsToStart: (state: S, action: PayloadAction<string[]>) => { state.restrictionsToStart = action.payload; }
});

export const getGameSelectors = <M extends keyof Omit<Omit<RootState, typeof $CombinedState>, 'app'>>(module: M) => {
	const selectOwnerKey = (state: RootState) => state[module].ownerKey;
	const selectGameIsRunning = (state: RootState) => state[module].roomStatus === RoomStatuses.IS_RUNNING || state[module].roomStatus === RoomStatuses.ON_PAUSE;
	const selectGameIsOnPause = (state: RootState) => state[module].roomStatus === RoomStatuses.ON_PAUSE;
	return {selectOwnerKey, selectGameIsRunning, selectGameIsOnPause};
};