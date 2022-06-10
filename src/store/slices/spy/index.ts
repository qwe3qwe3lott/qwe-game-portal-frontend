import {SpyState} from './types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Member} from '../../../types/Member';
import {Player} from '../../../types/Player';
import {FieldCard} from '../../../types/FieldCard';
import {Timer} from '../../../types/Timer';

const initialState: SpyState = {
	ownerKey: '',
	members: [],
	iAmPlayer: false,
	players: [],
	isRunning: false,
	fieldCards: [],
	startConditionFlag: false,
	nickname: '',
	sizes: { rows: 0, columns: 0 },
	iAmActing: false,
	isOnPause: false,
	timer: { currentTime: 0, maxTime: 0 }
};

const spySlice = createSlice({
	name: 'spy',
	initialState,
	reducers: {
		setMembers(state, action: PayloadAction<Member[]>) { state.members = action.payload; },
		setOwnerKey(state, action: PayloadAction<string>) { state.ownerKey = action.payload; },
		setIAmPlayerFlag(state, action: PayloadAction<boolean>) { state.iAmPlayer = action.payload; },
		setIsRunningFlag(state, action: PayloadAction<boolean>) { state.isRunning = action.payload; },
		setIAmActingFlag(state, action: PayloadAction<boolean>) { state.iAmActing = action.payload; },
		setIsOnPauseFlag(state, action: PayloadAction<boolean>) { state.isOnPause = action.payload; },
		setPlayers(state, action: PayloadAction<Player[]>) { state.players = action.payload; },
		setFieldCards(state, action: PayloadAction<FieldCard[]>) { state.fieldCards = action.payload; },
		setSizes(state, action: PayloadAction<{ rows: number, columns: number }>) { state.sizes = action.payload; },
		setTimer(state, action: PayloadAction<Timer>) { state.timer = action.payload; },
		tickTimer(state) { if (state.timer.currentTime > 0) state.timer.currentTime -= 1; },
		setStartConditionFlag(state, action: PayloadAction<boolean>) { state.startConditionFlag = action.payload; },
		setNickname(state, action: PayloadAction<string>) { state.nickname = action.payload; },
		clearStore(state) {
			state.ownerKey = '';
			state.members = [];
			state.iAmPlayer = false;
		}
	}
});

export const {setMembers, setIAmPlayerFlag, setOwnerKey, clearStore, setPlayers, setFieldCards,setIsRunningFlag,
	setStartConditionFlag, setNickname, setIAmActingFlag, setSizes, setIsOnPauseFlag, setTimer, tickTimer} = spySlice.actions;
export default spySlice.reducer;