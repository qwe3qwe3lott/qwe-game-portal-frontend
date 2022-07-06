import {State} from './types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getGameInitialState, getGameReducers} from '../../store/factories';
import {Player} from '../types/Player';
import {RoomStatus} from '../types/RoomStatus';
import {RoomOptions} from '../types/RoomOptions';

const initialState: State = {
	...getGameInitialState<Player, RoomStatus, RoomOptions>({ minPlayers: 2, maxPlayers: 8 })
};

const slice = createSlice({
	name: 'yesnt',
	initialState,
	reducers: {
		...getGameReducers<Player, State, RoomStatus, RoomOptions>(),
		setRoomStatus(state, action: PayloadAction<RoomStatus>) {
			switch (action.payload) {
			case 'idle':
			case 'pause':
				state.roomStatus = action.payload;
				break;
			case 'run':
				if (action.payload) {
					state.roomStatus = action.payload;
				} else {
					state.roomStatus = action.payload;
					state.iAmActing = false;
					state.timer = { currentTime: 0, maxTime: 0 };
				}
				break;
			}
		},
		clearStoreAfterLeaving(state) {
			state.ownerKey = '';
			state.members = [];
			state.iAmPlayer = false;
			state.players = [];
			state.roomStatus = 'idle';
			state.restrictionsToStart = [];
			state.iAmActing = false;
			state.timer = { currentTime: 0, maxTime: 0 };
			state.logs = [];
		}
	}
});

export const {setLogs, addLogRecord, setTimer, setIAmActingFlag, setIAmPlayerFlag, setOwnerKey, setRestrictionsToStart,
	setMembers, setRoomStatus, setPlayers, setRoomOptions, setOptionMinPlayers, setOptionMaxPlayers, clearStoreAfterLeaving} = slice.actions;
export default slice.reducer;