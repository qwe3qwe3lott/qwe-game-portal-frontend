import {combineReducers, configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';
import spyReducer from '../spy/store';
import yesntReducer from '../yesnt/store';

type State = {
	nickname: string
}
const initialState: State = {
	nickname: ''
};
const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setNickname(state, action: PayloadAction<string>) { state.nickname = action.payload; }
	}
});
export const {setNickname} = slice.actions;
export const selectNickname = (state: RootState): string => state.app.nickname;

const rootReducer = combineReducers({
	app: slice.reducer,
	spy: spyReducer,
	yesnt: yesntReducer
});

const store = configureStore({
	reducer: rootReducer
});

export default store;

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch