import React, {useCallback} from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';

import styles from './OwnerPanel.module.scss';
import {
	selectGameIsOnPause,
	selectGameIsRunning,
	selectOwnerKey,
	selectStartConditionFlag
} from '../../store/selectors';
import {useApi} from '../../api';

const OwnerPanel: React.FC = () => {
	const api = useApi();
	const ownerKey = useAppSelector(selectOwnerKey);
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	const gameIsOnPause = useAppSelector(selectGameIsOnPause);
	const startConditionFlag = useAppSelector(selectStartConditionFlag);

	const startHandler = useCallback(() => {
		if (!gameIsOnPause) api.startGame(ownerKey);
		else api.resumeGame(ownerKey);
	}, [ownerKey, gameIsOnPause]);
	const stopHandler = useCallback(() => {
		api.stopGame(ownerKey);
	}, [ownerKey]);
	const pauseHandler = useCallback(() => {
		api.pauseGame(ownerKey);
	}, [ownerKey]);
	return(<div className={styles.layout}>
		<p className={styles.title}>Панель владельца</p>
		<button
			className={styles.button}
			disabled={(gameIsRunning && !gameIsOnPause) || (!gameIsRunning && !startConditionFlag)}
			onClick={startHandler}>{gameIsOnPause ? 'Продолжить' : 'Старт'}</button>
		<button className={styles.button} disabled={!gameIsRunning} onClick={stopHandler}>Стоп</button>
		<button className={styles.button} disabled={!gameIsRunning || gameIsOnPause} onClick={pauseHandler}>Пауза</button>
	</div>);
};

export default OwnerPanel;