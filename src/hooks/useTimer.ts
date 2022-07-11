import {useAppSelector} from './typedReduxHooks';
import {useEffect, useState} from 'react';
import globalColors from '../colors.scss';
import {GameApi} from '../abstracts/GameApi';
import {RootState} from '../store';
import {Timer} from '../types/Timer';
import {GamePlayer} from '../types/GamePlayer';
import {GameRoomOptions} from '../types/GameRoomOptions';

export const useTimer = (
	api: GameApi<GamePlayer, string, GameRoomOptions>,
	selectTimer: (state: RootState) => Timer,
	selectGameIsOnPause: (state: RootState) => boolean,
	mini: boolean
) => {
	const storeTimer = useAppSelector(selectTimer);
	const isOnPause = useAppSelector(selectGameIsOnPause);
	const [timer, setTimer] = useState({...storeTimer});
	useEffect(() => {
		setTimer({...storeTimer});
	}, [storeTimer]);
	useEffect(() => {
		const handler = () => { api.requestTimer(); };
		window.addEventListener('focus', handler);
		api.requestTimer();
		return () => { window.removeEventListener('focus', handler); };
	}, []);
	useEffect(() => {
		if (isOnPause) return;
		if (timer.currentTime <= 0) return;
		const timeout = setTimeout(() => {
			setTimer({ currentTime: timer.currentTime - 1, maxTime: timer.maxTime });
		}, 1000);
		return () => { clearTimeout(timeout); };
	}, [isOnPause, timer]);
	const background = `linear-gradient(${mini ? 0 : 90}deg, ${globalColors.secondaryColor} ${(100 - Math.round(timer.currentTime * 100 / timer.maxTime))}%, 
	${globalColors.secondaryOppositeColor} 0%)`;
	const timeText = mini ? '' : (isOnPause ? 'ПАУЗА' : `${Math.floor(timer.currentTime / 60)}:${timer.currentTime % 60 < 10 ? '0' : ''}${timer.currentTime % 60}`);
	return { background, timeText };
};