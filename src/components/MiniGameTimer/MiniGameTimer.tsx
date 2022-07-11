import React from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';

import {Timer as TimerType} from '../../types/Timer';
import styles from './MiniGameTimer.module.scss';
import {GameApi} from '../../abstracts/GameApi';
import {RootState} from '../../store';
import {useTimer} from '../../hooks/useTimer';
import MiniColumnPanel from '../MiniColumnPanel';
import {GamePlayer} from '../../types/GamePlayer';
import {GameRoomOptions} from '../../types/GameRoomOptions';

type Props = {
    api: GameApi<GamePlayer, string, GameRoomOptions>
    selectTimer: (state: RootState) => TimerType
    selectGameIsOnPause: (state: RootState) => boolean
    selectGameIsRunning: (state: RootState) => boolean
}

const MiniGameTimer: React.FC<Props> = ({api, selectTimer, selectGameIsOnPause, selectGameIsRunning}) => {
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	return gameIsRunning ? <Content api={api} selectTimer={selectTimer} selectGameIsOnPause={selectGameIsOnPause}/> : null;
};

export default MiniGameTimer;

type ContentProps = Omit<Props, 'selectGameIsRunning'>
const Content: React.FC<ContentProps> = ({api, selectTimer, selectGameIsOnPause}) => {
	const { background } = useTimer(api, selectTimer, selectGameIsOnPause, true);
	return(<MiniColumnPanel>
		<div className={styles.bar} style={{ background }}/>
	</MiniColumnPanel>);
};