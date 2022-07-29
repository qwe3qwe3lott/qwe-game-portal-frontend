import {GameState} from './types';
import {GamePlayer} from '../types/GamePlayer';
import {GameRoomOptions} from '../types/GameRoomOptions';
import {Draft} from '@reduxjs/toolkit';

export const clearStateAfterLeave = (state: Draft<GameState<GamePlayer, string, GameRoomOptions>>) => {
	state.ownerKey = '';
	state.members = [];
	state.iAmPlayer = false;
	state.players = [];
	state.roomStatus = 'idle';
	state.restrictionsToStart = [];
	state.iAmActing = false;
	state.timer = { currentTime: 0, maxTime: 0 };
	state.logs = [];
	state.roomTitle = '';
	state.gameIsOnPause = false;
};