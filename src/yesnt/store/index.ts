import {State} from './types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getGameInitialState, getGameReducers} from '../../store/factories';
import {Player} from '../types/Player';
import {RoomStatus} from '../types/RoomStatus';
import {RoomOptions} from '../types/RoomOptions';
import {Answers} from '../enums/Answers';
import {Result} from '../types/Result';
import {clearStateAfterLeave} from '../../store/utils';

const initialState: State = {
	...getGameInitialState<Player, RoomStatus, RoomOptions>({ minPlayers: 3, maxPlayers: 16, secondsToAsk: 60, secondsToAnswer: 60 }, 'idle'),
	question: '',
	countOfAnswers: 0
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
				state.question = '';
				state.countOfAnswers = 0;
				delete state.result;
				delete state.answer;
				break;
			case 'ask':
				state.roomStatus = action.payload;
				break;
			case 'answer':
				state.roomStatus = action.payload;
				state.countOfAnswers = 0;
				delete state.answer;
				break;
			}
		},
		clearStoreAfterLeaving(state) {
			clearStateAfterLeave(state);
			state.question = '';
			state.countOfAnswers = 0;
			delete state.result;
			delete state.answer;
		},
		setCountOfAnswers(state, action: PayloadAction<number>) { state.countOfAnswers = action.payload; },
		setQuestion(state, action: PayloadAction<string>) { state.question = action.payload; },
		setAnswer(state, action: PayloadAction<Answers | undefined>) { state.answer = action.payload; },
		setResult(state, action: PayloadAction<Result>) { state.result = action.payload; },
		setOptionSecondsToAsk(state, action: PayloadAction<number>) { state.roomOptions.secondsToAsk = action.payload; },
		setOptionSecondsToAnswer(state, action: PayloadAction<number>) { state.roomOptions.secondsToAnswer = action.payload; }
	}
});

export const {setLogs, addLogRecord, setTimer, setIAmActingFlag, setIAmPlayerFlag, setOwnerKey, setRestrictionsToStart,
	setMembers, setRoomStatus, setPlayers, setRoomOptions, setOptionMinPlayers, setOptionMaxPlayers, clearStoreAfterLeaving,
	setQuestion, setAnswer, setResult, setGameIsOnPauseFlag, setOptionSecondsToAnswer, setOptionSecondsToAsk, setCountOfAnswers,
	setRoomTitle} = slice.actions;
export default slice.reducer;