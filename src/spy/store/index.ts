import {State} from './types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Member} from '../types/Member';
import {Player} from '../types/Player';
import {FieldCard} from '../types/FieldCard';
import {Timer} from '../types/Timer';
import {LogRecord} from '../types/LogRecord';
import {Sizes} from '../types/Sizes';
import {RoomOptions} from '../types/RoomOptions';

const initialState: State = {
	ownerKey: '',
	members: [],
	iAmPlayer: false,
	players: [],
	isRunning: false,
	fieldCards: [],
	startConditionFlag: false,
	sizes: { rows: 0, columns: 0 },
	iAmActing: false,
	isOnPause: false,
	timer: { currentTime: 0, maxTime: 0 },
	logs: [],
	lastWinner: '',
	membersRestriction: { min: 2, max: 8 },
	roomOptions: {
		rows: 5,
		maxPlayers: 8,
		winScore: 3,
		secondsToAct: 60,
		minPlayers: 2,
		columns: 5,
		optionsOfCards: [
			{ title: 'Radioactive', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/Radioactive.jpg' },
			{ title: 'Love', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/Love.jpg' },
			{ title: 'Ghibli', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/Ghibli.jpg' },
			{ title: 'Death', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/Death.jpg' },
			{ title: 'Surreal', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/Surreal.jpg' },
			{ title: 'Robots', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/Robots.jpg' },
			{ title: 'No Style', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/NoStyle.jpg' },
			{ title: 'Wuhtercuhler', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/Wuhtercuhler.jpg' },
			{ title: 'Provenance', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/Provenance.jpg' },
			{ title: 'Moonwalker', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/Moonwalker.jpg' },
			{ title: 'Blacklight', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/Blacklight.jpg' },
			{ title: 'Rose Gold', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/RoseGold.jpg' },
			{ title: 'Steampunk', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/Steampunk.jpg' },
			{ title: 'Fantasy Art', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/FantasyArt.jpg' },
			{ title: 'Vibrant', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/Vibrant.jpg' },
			{ title: 'HD', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/HD.jpg' },
			{ title: 'Psychic', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/Psychic.jpg' },
			{ title: 'Dark Fantasy', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/DarkFantasy.jpg' },
			{ title: 'Mystical', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/Mystical.jpg' },
			{ title: 'Baroque', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/Baroque.jpg' },
			{ title: 'Etching', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/Etching.jpg' },
			{ title: 'S.Dali', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/S.Dali.jpg' },
			{ title: 'Psychedelic', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/Psychedelic.jpg' },
			{ title: 'Synthwave', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/Synthwave.jpg' },
			{ title: 'Ukiyoe', url: 'https://kozlov-spy-api.tk/cardPacks/HarryDuBois/Ukiyoe.jpg' }
		]
	}
};

const slice = createSlice({
	name: 'spy',
	initialState,
	reducers: {
		setLastWinner(state, action: PayloadAction<string>) { state.lastWinner = action.payload; },
		setRoomOptions(state, action: PayloadAction<RoomOptions>) {
			state.roomOptions = action.payload;
			if (action.payload.minPlayers !== state.membersRestriction.min) state.membersRestriction.min = action.payload.minPlayers;
			if (action.payload.maxPlayers !== state.membersRestriction.max) state.membersRestriction.max = action.payload.maxPlayers;
		},
		setLogs(state, action: PayloadAction<LogRecord[]>) { state.logs = action.payload; },
		addLogRecord(state, action: PayloadAction<LogRecord>) { state.logs.unshift(action.payload); },
		setMembers(state, action: PayloadAction<Member[]>) { state.members = action.payload; },
		setOwnerKey(state, action: PayloadAction<string>) { state.ownerKey = action.payload; },
		setIAmPlayerFlag(state, action: PayloadAction<boolean>) { state.iAmPlayer = action.payload; },
		setIsRunningFlag(state, action: PayloadAction<boolean>) {
			if (action.payload) {
				state.lastWinner = '';
				state.logs = [];
				state.isOnPause = false;
				state.isRunning = action.payload;
			} else {
				state.isRunning = action.payload;
				state.isOnPause = false;
				state.iAmActing = false;
				state.timer = { currentTime: 0, maxTime: 0 };
			}
		},
		setIAmActingFlag(state, action: PayloadAction<boolean>) { state.iAmActing = action.payload; },
		setIsOnPauseFlag(state, action: PayloadAction<boolean>) { state.isOnPause = action.payload; },
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
			state.isRunning = false;
			state.fieldCards = [];
			state.startConditionFlag = false;
			state.sizes = { rows: 0, columns: 0 };
			state.iAmActing = false;
			state.isOnPause = false;
			state.timer = { currentTime: 0, maxTime: 0 };
			state.logs = [];
			state.lastWinner = '';
		},
		setOptionSecondsToAct(state, action: PayloadAction<number>) { state.roomOptions.secondsToAct = action.payload; },
		setOptionWinScore(state, action: PayloadAction<number>) { state.roomOptions.winScore = action.payload; },
		setOptionColumns(state, action: PayloadAction<number>) { state.roomOptions.columns = action.payload; },
		setOptionRows(state, action: PayloadAction<number>) { state.roomOptions.rows = action.payload; },
		setOptionMinPlayers(state, action: PayloadAction<number>) { state.roomOptions.minPlayers = action.payload; },
		setOptionMaxPlayers(state, action: PayloadAction<number>) { state.roomOptions.maxPlayers = action.payload; }
	}
});

export const {setMembers, setIAmPlayerFlag, setOwnerKey, clearStoreAfterLeaving, setPlayers, setFieldCards,setIsRunningFlag,
	setStartConditionFlag, setIAmActingFlag, setSizes, setIsOnPauseFlag, setTimer, tickTimer, setCard,
	setLogs, addLogRecord, addActCardIds, setLastWinner, setRoomOptions, setOptionSecondsToAct, setOptionWinScore,
	setOptionColumns, setOptionRows, setOptionMaxPlayers, setOptionMinPlayers} = slice.actions;
export default slice.reducer;