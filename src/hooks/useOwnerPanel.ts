import {GameApi} from '../abstracts/GameApi';
import {RootState} from '../store';
import {useAppSelector} from './typedReduxHooks';
import {GamePlayer} from '../types/GamePlayer';

export const useOwnerPanel = (
	api: GameApi<GamePlayer>,
	selectOwnerKey: (state: RootState) => string,
	selectGameIsRunning: (state: RootState) => boolean,
	selectGameIsOnPause: (state: RootState) => boolean,
	selectRestrictionsToStart: (state: RootState) => string[]
) => {
	const ownerKey = useAppSelector(selectOwnerKey);
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	const gameIsOnPause = useAppSelector(selectGameIsOnPause);
	const restrictionsToStart = useAppSelector(selectRestrictionsToStart);
	const startHandler = () => {
		if (!gameIsOnPause) api.startGame(ownerKey);
		else api.resumeGame(ownerKey);
	};
	const stopHandler = () => api.stopGame(ownerKey);
	const pauseHandler = () => api.pauseGame(ownerKey);
	return { gameIsRunning, gameIsOnPause, startHandler, stopHandler, pauseHandler, restrictionsToStart };
};