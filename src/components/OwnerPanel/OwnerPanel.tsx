import React, {useCallback} from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import spyAPI from '../../services/SpyAPI';

import styles from './OwnerPanel.module.scss';

const OwnerPanel: React.FC = () => {
	const ownerKey = useAppSelector(state => state.spy.ownerKey);
	const gameIsRunning = useAppSelector(state => state.spy.isRunning);
	const gameIsOnPause = useAppSelector(state => state.spy.isOnPause);
	const startConditionFlag = useAppSelector(state => state.spy.startConditionFlag);

	const startHandler = useCallback(() => {
		if (!gameIsOnPause) spyAPI.startGame(ownerKey);
		else spyAPI.resumeGame(ownerKey);
	}, [ownerKey, gameIsOnPause]);
	const stopHandler = useCallback(() => {
		spyAPI.stopGame(ownerKey);
	}, [ownerKey]);
	const pauseHandler = useCallback(() => {
		spyAPI.pauseGame(ownerKey);
	}, [ownerKey]);
	return(<div className={styles.layout}>
		<button
			className={styles.button}
			disabled={(gameIsRunning && !gameIsOnPause) || (!gameIsRunning && !startConditionFlag)}
			onClick={startHandler}>{gameIsOnPause ? 'Продолжить' : 'Старт'}</button>
		<button className={styles.button} disabled={!gameIsRunning} onClick={stopHandler}>Стоп</button>
		<button className={styles.button} disabled={!gameIsRunning || gameIsOnPause} onClick={pauseHandler}>Пауза</button>
	</div>);
};

export default OwnerPanel;