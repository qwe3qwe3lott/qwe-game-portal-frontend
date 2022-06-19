import React, {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/typedReduxHooks';
import {tickTimer} from '../../store';
import api from '../../api';

import globalColors from '../../../colors.scss';
import styles from './Timer.module.scss';
import {selectGameIsOnPause, selectTimer} from '../../store/selectors';

const Timer: React.FC = () => {
	const dispatch = useAppDispatch();
	const timer = useAppSelector(selectTimer);
	const isOnPause = useAppSelector(selectGameIsOnPause);
	useEffect(() => {
		const handler = () => {
			api.requestTimer();
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
	const background = useMemo(() => {
		return `linear-gradient(90deg, ${globalColors.secondaryColor} ${(100 - Math.round(timer.currentTime * 100 / timer.maxTime))}%, ${globalColors.secondaryOppositeColor} 0%)`;
	}, [timer]);
	const timeText = useMemo(() => {
		return `${Math.floor(timer.currentTime / 60)}:${timer.currentTime % 60 < 10 ? '0' : ''}${timer.currentTime % 60}`;
	}, [timer]);
	return(<div className={styles.layout}>
		{isOnPause ? <p className={styles.text}>ПАУЗА</p> : <>
			<p className={styles.text}>{timeText}</p>
			<div className={styles.bar} style={{ background: background }}/>
		</>}
	</div>);
};

export default Timer;