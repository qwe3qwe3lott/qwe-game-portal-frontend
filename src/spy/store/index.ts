import {State} from './types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Member} from '../types/Member';
import {Player} from '../types/Player';
import {FieldCard} from '../types/FieldCard';
import {Timer} from '../types/Timer';
import {LogRecord} from '../types/LogRecord';
import {Sizes} from '../types/Sizes';
import {RoomOptions} from '../types/RoomOptions';
import {RoomStatuses} from '../enums/RoomStatuses';
import {CardOptions} from '../types/CardOptions';

const initialState: State = {
	ownerKey: '',
	members: [],
	iAmPlayer: false,
	players: [],
	fieldCards: [],
	startConditionFlag: false,
	sizes: { rows: 0, columns: 0 },
	iAmActing: false,
	roomStatus: RoomStatuses.IDLE,
	timer: { currentTime: 0, maxTime: 0 },
	logs: [],
	lastWinner: '',
	membersRestriction: { min: 2, max: 8 },
	optionsOfCardsIdCounter: 1,
	roomOptions: {
		rows: 5,
		maxPlayers: 8,
		winScore: 3,
		secondsToAct: 60,
		minPlayers: 2,
		columns: 5
	},
	optionsOfCards: []
};

const slice = createSlice({
	name: 'spy',
	initialState,
	reducers: {
		setLastWinner(state, action: PayloadAction<string>) { state.lastWinner = action.payload; },
		setRoomOptions(state, action: PayloadAction<RoomOptions>) {
			state.roomOptions = action.payload;
			state.membersRestriction.min = action.payload.minPlayers;
			state.membersRestriction.max = action.payload.maxPlayers;
		},
		setOptionsOfCards(state, action: PayloadAction<CardOptions[]>) {
			state.optionsOfCards = action.payload;
			state.optionsOfCardsIdCounter = action.payload.length + 1;
		},
		setLogs(state, action: PayloadAction<LogRecord[]>) { state.logs = action.payload; },
		addLogRecord(state, action: PayloadAction<LogRecord>) { state.logs.unshift(action.payload); },
		setMembers(state, action: PayloadAction<Member[]>) { state.members = action.payload; },
		setOwnerKey(state, action: PayloadAction<string>) { state.ownerKey = action.payload; },
		setIAmPlayerFlag(state, action: PayloadAction<boolean>) { state.iAmPlayer = action.payload; },
		setRoomStatus(state, action: PayloadAction<RoomStatuses>) {
			switch (action.payload) {
			case RoomStatuses.IDLE:
			case RoomStatuses.ON_PAUSE:
				state.roomStatus = action.payload;
				break;
			case RoomStatuses.IS_RUNNING:
				if (action.payload) {
					state.lastWinner = '';
					state.roomStatus = action.payload;
				} else {
					state.roomStatus = action.payload;
					state.iAmActing = false;
					state.timer = { currentTime: 0, maxTime: 0 };
				}
				break;
			}
		},
		setIAmActingFlag(state, action: PayloadAction<boolean>) { state.iAmActing = action.payload; },
		setPlayers(state, action: PayloadAction<Player[]>) { state.players = action.payload; },
		setFieldCards(state, action: PayloadAction<FieldCard[]>) { state.fieldCards = action.payload; },
		addActCardIds(state, action: PayloadAction<number[]>) {
			for (const card of state.fieldCards) {
				if (action.payload.includes(card.id)) card.hasActOpportunity = true;
			}
		},
		setSizes(state, action: PayloadAction<Sizes>) { state.sizes = action.payload; },
		setTimer(state, action: PayloadAction<Timer>) { state.timer = action.payload; },
		setCard(state, action: PayloadAction<FieldCard>) { state.card = action.payload; },
		tickTimer(state) { if (state.timer.currentTime > 0) state.timer.currentTime -= 1; },
		setStartConditionFlag(state, action: PayloadAction<boolean>) { state.startConditionFlag = action.payload; },
		clearStoreAfterLeaving(state) {
			state.ownerKey = '';
			state.members = [];
			state.iAmPlayer = false;
			state.players = [];
			state.roomStatus = RoomStatuses.IDLE;
			state.fieldCards = [];
			state.startConditionFlag = false;
			state.sizes = { rows: 0, columns: 0 };
			state.iAmActing = false;
			state.timer = { currentTime: 0, maxTime: 0 };
			state.logs = [];
			state.lastWinner = '';
		},
		setOptionSecondsToAct(state, action: PayloadAction<number>) { state.roomOptions.secondsToAct = action.payload; },
		setOptionWinScore(state, action: PayloadAction<number>) { state.roomOptions.winScore = action.payload; },
		setOptionColumns(state, action: PayloadAction<number>) { state.roomOptions.columns = action.payload; },
		setOptionRows(state, action: PayloadAction<number>) { state.roomOptions.rows = action.payload; },
		setOptionMinPlayers(state, action: PayloadAction<number>) { state.roomOptions.minPlayers = action.payload; },
		setOptionMaxPlayers(state, action: PayloadAction<number>) { state.roomOptions.maxPlayers = action.payload; },
		changeOptionTitleOfCard(state, action: PayloadAction<{ id: number, title: string }>) {
			const optionsOfCard = state.optionsOfCards.find(options => options.id === action.payload.id);
			if (!optionsOfCard) return;
			optionsOfCard.title = action.payload.title;
		},
		changeOptionUrlOfCard(state, action: PayloadAction<{ id: number, url: string }>) {
			const optionsOfCard = state.optionsOfCards.find(options => options.id === action.payload.id);
			if (!optionsOfCard) return;
			optionsOfCard.url = action.payload.url;
		},
		addOptionsOfCard(state) {
			if (state.optionsOfCards.length >= 49) return;
			state.optionsOfCards.push({ id: state.optionsOfCardsIdCounter++, title: '', url: '' });
		},
		deleteOptionsOfCard(state, action: PayloadAction<number>) {
			state.optionsOfCards = state.optionsOfCards.filter(options => options.id !== action.payload);
		}
	}
});

export const {setMembers, setIAmPlayerFlag, setOwnerKey, clearStoreAfterLeaving, setPlayers, setFieldCards,
	setStartConditionFlag, setIAmActingFlag, setSizes, setRoomStatus, setTimer, tickTimer, setCard,
	setLogs, addLogRecord, addActCardIds, setLastWinner, setRoomOptions, setOptionSecondsToAct, setOptionWinScore,
	setOptionColumns, setOptionRows, setOptionMaxPlayers, setOptionMinPlayers, changeOptionTitleOfCard,
	changeOptionUrlOfCard, setOptionsOfCards, addOptionsOfCard, deleteOptionsOfCard} = slice.actions;
export default slice.reducer;