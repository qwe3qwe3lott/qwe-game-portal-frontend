import React, {useEffect, useMemo, useState} from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';

import globalColors from '../../../colors.scss';
import styles from './Timer.module.scss';
import {selectGameIsOnPause, selectTimer} from '../../store/selectors';
import {useApi} from '../../api';

const Timer: React.FC = () => {
	const api = useApi();
	const storeTimer = useAppSelector(selectTimer);
	const isOnPause = useAppSelector(selectGameIsOnPause);
	const [timer, setTimer] = useState({...storeTimer});
	useEffect(() => {
		setTimer({...storeTimer});
	}, [storeTimer]);
	useEffect(() => {
		const handler = () => { api.requestTimer(); };
		window.addEventListener('focus', handler);
		return () => { window.removeEventListener('focus', handler); };
	}, []);
	useEffect(() => {
		if (isOnPause) return;
		if (timer.currentTime <= 0) return ;
		const timeout = setTimeout(() => {
			setTimer({...timer, currentTime: timer.currentTime - 1 });
		}, 1000);
		return () => { clearTimeout(timeout); };
	}, [isOnPause, timer]);
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