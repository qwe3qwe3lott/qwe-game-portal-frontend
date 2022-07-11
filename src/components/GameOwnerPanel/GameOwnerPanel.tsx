import {GameApi} from '../../abstracts/GameApi';
import {RootState} from '../../store';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import {useOwnerPanel} from '../../hooks/useOwnerPanel';
import ColumnPanel from '../ColumnPanel';
import styles from './GameOwnerPanel.module.scss';
import React from 'react';
import {GamePlayer} from '../../types/GamePlayer';
import {GameRoomOptions} from '../../types/GameRoomOptions';

type Props = {
	api: GameApi<GamePlayer, string, GameRoomOptions>
	selectOwnerKey: (state: RootState) => string
	selectGameIsRunning: (state: RootState) => boolean
	selectGameIsOnPause: (state: RootState) => boolean
	selectRestrictionsToStart: (state: RootState) => string[]
}
const GameOwnerPanel: React.FC<Props> = (props) => {
	const ownerKey = useAppSelector(props.selectOwnerKey);
	return ownerKey ? <Content {...props}/> : null;
};

export default GameOwnerPanel;

const Content: React.FC<Props> = ({selectOwnerKey, selectGameIsRunning, selectGameIsOnPause, selectRestrictionsToStart, api}) => {
	const { gameIsRunning, gameIsOnPause, startHandler, stopHandler, pauseHandler, restrictionsToStart }
		= useOwnerPanel(api, selectOwnerKey, selectGameIsRunning, selectGameIsOnPause, selectRestrictionsToStart);
	return(<ColumnPanel title={'Панель владельца'}>
		{!gameIsRunning && restrictionsToStart.length > 0 && <ul>
			{restrictionsToStart.map((restriction, index) => <li key={index} className={styles.restriction}>
				{restriction}
			</li>)}
		</ul>}
		<button
			className={styles.button}
			disabled={(gameIsRunning && !gameIsOnPause) || (!gameIsRunning && restrictionsToStart.length > 0)}
			onClick={startHandler}>{gameIsOnPause ? 'Продолжить' : 'Старт'}</button>
		<button className={styles.button} disabled={!gameIsRunning || gameIsOnPause} onClick={pauseHandler}>Пауза</button>
		<button className={styles.button} disabled={!gameIsRunning} onClick={stopHandler}>Стоп</button>
	</ColumnPanel>);
};