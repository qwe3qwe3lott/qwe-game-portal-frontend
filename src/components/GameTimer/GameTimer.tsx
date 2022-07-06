import React from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';

import {Timer as TimerType} from '../../types/Timer';
import styles from './GameTimer.module.scss';
import {GameApi} from '../../abstracts/GameApi';
import {RootState} from '../../store';
import {useTimer} from '../../hooks/useTimer';
import ColumnPanel from '../ColumnPanel';
import {GamePlayer} from '../../types/GamePlayer';
import {GameRoomStatus} from '../../types/GameRoomStatus';
import {GameRoomOptions} from '../../types/GameRoomOptions';

type Props = {
	api: GameApi<GamePlayer, GameRoomStatus, GameRoomOptions>
	selectTimer: (state: RootState) => TimerType
	selectGameIsOnPause: (state: RootState) => boolean
	selectGameIsRunning: (state: RootState) => boolean
}

const GameTimer: React.FC<Props> = ({api, selectTimer, selectGameIsOnPause, selectGameIsRunning}) => {
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	return gameIsRunning ? <Content api={api} selectTimer={selectTimer} selectGameIsOnPause={selectGameIsOnPause}/> : null;
};

export default GameTimer;

type ContentProps = Omit<Props, 'selectGameIsRunning'>
const Content: React.FC<ContentProps> = ({api, selectTimer, selectGameIsOnPause}) => {
	const { background, timeText } = useTimer(api, selectTimer, selectGameIsOnPause, false);
	return(<ColumnPanel title={timeText}>
		<div className={styles.bar} style={{ background }}/>
	</ColumnPanel>);
};