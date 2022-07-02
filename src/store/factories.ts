import {GameState} from './types';
import {RoomStatuses} from '../enums/RoomStatuses';
import {PayloadAction} from '@reduxjs/toolkit';
import {LogRecord} from '../types/LogRecord';
import {Member} from '../types/Member';
import {Timer} from '../types/Timer';

export const getGameInitialState = (): GameState => ({
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

export const getGameReducers = <S extends GameState>() => ({
	setLogs: (state: S, action: PayloadAction<LogRecord[]>) => { state.logs = action.payload; },
	addLogRecord: (state: S, action: PayloadAction<LogRecord>) => { state.logs.unshift(action.payload); },
	setMembers: (state: S, action: PayloadAction<Member[]>) => { state.members = action.payload; },
	setOwnerKey: (state: S, action: PayloadAction<string>) => { state.ownerKey = action.payload; },
	setIAmPlayerFlag: (state: S, action: PayloadAction<boolean>) => { state.iAmPlayer = action.payload; },
	setIAmActingFlag: (state: S, action: PayloadAction<boolean>) => { state.iAmActing = action.payload; },
	setTimer: (state: S, action: PayloadAction<Timer>) => { state.timer = action.payload; },
	setRestrictionsToStart: (state: S, action: PayloadAction<string[]>) => { state.restrictionsToStart = action.payload; }
});