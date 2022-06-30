import React, {useCallback} from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';

import styles from './OwnerPanel.module.scss';
import {
	selectGameIsOnPause,
	selectGameIsRunning,
	selectOwnerKey,
	selectRestrictionsToStart
} from '../../store/selectors';
import {useApi} from '../../api';

type Props = {
	miniPanel?: boolean
}
const OwnerPanel: React.FC<Props> = ({ miniPanel }) => {
	return miniPanel ? <MiniOwnerPanel/> : <NormalOwnerPanel/>;
};

export default OwnerPanel;

const useOwnerPanel = () => {
	const api = useApi();
	const ownerKey = useAppSelector(selectOwnerKey);
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	const gameIsOnPause = useAppSelector(selectGameIsOnPause);
	const restrictionsToStart = useAppSelector(selectRestrictionsToStart);
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
	return { gameIsRunning, gameIsOnPause, startHandler, stopHandler, pauseHandler, restrictionsToStart };
};

const MiniOwnerPanel: React.FC = () => {
	const { gameIsRunning, gameIsOnPause, startHandler, stopHandler, pauseHandler, restrictionsToStart } = useOwnerPanel();
	return(<div className={styles.miniLayout}>
		<button
			className={[styles.miniButton, styles.miniStart].join(' ')}
			disabled={(gameIsRunning && !gameIsOnPause) || (!gameIsRunning && restrictionsToStart.length > 0)}
			onClick={startHandler}/>
		<button className={[styles.miniButton, styles.miniStop].join(' ')} disabled={!gameIsRunning} onClick={stopHandler}/>
		<button className={[styles.miniButton, styles.miniPause].join(' ')} disabled={!gameIsRunning || gameIsOnPause} onClick={pauseHandler}/>
	</div>);
};

const NormalOwnerPanel: React.FC = () => {
	const { gameIsRunning, gameIsOnPause, startHandler, stopHandler, pauseHandler, restrictionsToStart } = useOwnerPanel();
	return(<div className={styles.layout}>
		<p className={styles.title}>Панель владельца</p>
		{restrictionsToStart.map((restriction, index) => <p key={index} className={styles.restriction}>
			{restriction}
		</p>)}
		<button
			className={styles.button}
			disabled={(gameIsRunning && !gameIsOnPause) || (!gameIsRunning && restrictionsToStart.length > 0)}
			onClick={startHandler}>{gameIsOnPause ? 'Продолжить' : 'Старт'}</button>
		<button className={styles.button} disabled={!gameIsRunning} onClick={stopHandler}>Стоп</button>
		<button className={styles.button} disabled={!gameIsRunning || gameIsOnPause} onClick={pauseHandler}>Пауза</button>
	</div>);
};