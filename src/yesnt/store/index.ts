import {State} from './types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getGameInitialState, getGameReducers} from '../../store/factories';
import {RoomStatuses} from '../../enums/RoomStatuses';

const initialState: State = {
	...getGameInitialState()
};

const slice = createSlice({
	name: 'yesnt',
	initialState,
	reducers: {
		...getGameReducers<State>(),
		setRoomStatus(state, action: PayloadAction<RoomStatuses>) {
			switch (action.payload) {
			case RoomStatuses.IDLE:
			case RoomStatuses.ON_PAUSE:
				state.roomStatus = action.payload;
				break;
			case RoomStatuses.IS_RUNNING:
				if (action.payload) {
					state.roomStatus = action.payload;
				} else {
					state.roomStatus = action.payload;
					state.iAmActing = false;
					state.timer = { currentTime: 0, maxTime: 0 };
				}
				break;
			}
		}
	}
});

export const {setLogs, addLogRecord, setTimer, setIAmActingFlag, setIAmPlayerFlag, setOwnerKey, setRestrictionsToStart,
	setMembers, setRoomStatus} = slice.actions;
export default slice.reducer;