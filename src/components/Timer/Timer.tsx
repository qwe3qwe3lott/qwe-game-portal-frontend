import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import {tickTimer} from '../../store/slices/spy';
import spyAPI from '../../services/SpyAPI';

const Timer: React.FC = () => {
	const dispatch = useAppDispatch();
	const timer = useAppSelector(state => state.spy.timer);
	const isOnPause = useAppSelector(state => state.spy.isOnPause);
	useEffect(() => {
		const handler = () => {
			spyAPI.requestTimer();
		};
		window.addEventListener('focus', handler);
		document.addEventListener('focus', handler);
		return () => {
			window.removeEventListener('focus', handler);
			document.removeEventListener('focus', handler);
		};
	}, []);
	useEffect(() => {
		if (isOnPause) return;
		const interval = setInterval(() => {
			dispatch(tickTimer());
			if (timer.currentTime < 1) clearInterval(interval);
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [timer, isOnPause]);
	return(<div>
		{isOnPause ? 'ПАУЗА' : `${timer.currentTime} из ${timer.maxTime}`}
	</div>);
};

export default Timer;