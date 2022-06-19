import {combineReducers, configureStore} from '@reduxjs/toolkit';
import spyReducer from '../spy/store';

const rootReducer = combineReducers({
	spy: spyReducer
});

const store = configureStore({
	reducer: rootReducer
});

export default store;

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch