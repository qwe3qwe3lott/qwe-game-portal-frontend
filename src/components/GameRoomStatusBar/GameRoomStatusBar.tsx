import React from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import styles from './GameRoomStatusBar.module.scss';
import {RootState} from '../../store';

type Props = {
    selectGameIsRunning: (state: RootState) => boolean,
    selectGameIsOnPause: (state: RootState) => boolean
}
const GameRoomStatusBar: React.FC<Props> = ({selectGameIsRunning, selectGameIsOnPause}) => {
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	const gameIsOnPause = useAppSelector(selectGameIsOnPause);
	return !gameIsRunning || gameIsOnPause ? <div className={styles.statusBar}>
		<p className={styles.status}>{gameIsOnPause ? 'Игра на паузе' : 'Ожидайте начала игры'}</p>
	</div> : null;
};

export default GameRoomStatusBar;