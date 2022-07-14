import {State} from './types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getGameInitialState, getGameReducers} from '../../store/factories';
import {Player} from '../types/Player';
import {RoomStatus} from '../types/RoomStatus';
import {RoomOptions} from '../types/RoomOptions';
import {Answers} from '../enums/Answers';
import {Result} from '../types/Result';

const initialState: State = {
	...getGameInitialState<Player, RoomStatus, RoomOptions>({ minPlayers: 2, maxPlayers: 8, secondsToAsk: 60, secondsToAnswer: 60 }, 'idle'),
	question: ''
};

const slice = createSlice({
	name: 'yesnt',
	initialState,
	reducers: {
		...getGameReducers<Player, State, RoomStatus, RoomOptions>(),
		setRoomStatus(state, action: PayloadAction<RoomStatus>) {
			switch (action.payload) {
			case 'idle':
				state.roomStatus = action.payload;
				state.iAmActing = false;
				state.timer = { currentTime: 0, maxTime: 0 };
				state.result = undefined;
				break;
			case 'ask':
				state.roomStatus = action.payload;
				break;
			case 'answer':
				state.roomStatus = action.payload;
				state.answer = undefined;
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
		},
		setQuestion(state, action: PayloadAction<string>) { state.question = action.payload; },
		setAnswer(state, action: PayloadAction<Answers | undefined>) { state.answer = action.payload; },
		setResult(state, action: PayloadAction<Result>) { state.result = action.payload; },
		setOptionSecondsToAsk(state, action: PayloadAction<number>) { state.roomOptions.secondsToAsk = action.payload; },
		setOptionSecondsToAnswer(state, action: PayloadAction<number>) { state.roomOptions.secondsToAnswer = action.payload; }
	}
});

export const {setLogs, addLogRecord, setTimer, setIAmActingFlag, setIAmPlayerFlag, setOwnerKey, setRestrictionsToStart,
	setMembers, setRoomStatus, setPlayers, setRoomOptions, setOptionMinPlayers, setOptionMaxPlayers, clearStoreAfterLeaving,
	setQuestion, setAnswer, setResult, setGameIsOnPauseFlag, setOptionSecondsToAnswer, setOptionSecondsToAsk} = slice.actions;
export default slice.reducer;