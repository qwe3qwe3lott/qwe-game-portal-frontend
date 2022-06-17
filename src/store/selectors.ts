import {RootState} from './index';
import {RoomOptions} from '../types/RoomOptions';

export const selectRoomOptionSecondsToAct = (state: RootState): number => state.spy.roomOptions.secondsToAct;
export const selectRoomOptionWinScore = (state: RootState): number => state.spy.roomOptions.winScore;
export const selectRoomOptionColumns = (state: RootState): number => state.spy.roomOptions.columns;
export const selectRoomOptionRows = (state: RootState): number => state.spy.roomOptions.rows;
export const selectRoomMinPlayers = (state: RootState): number => state.spy.roomOptions.minPlayers;
export const selectRoomMaxPlayers = (state: RootState): number => state.spy.roomOptions.maxPlayers;
export const selectRoomOptions = (state: RootState): RoomOptions => state.spy.roomOptions;
export const selectGameIsRunning = (state: RootState): boolean => state.spy.isRunning;
export const selectOwnerKey = (state: RootState): string => state.spy.ownerKey;