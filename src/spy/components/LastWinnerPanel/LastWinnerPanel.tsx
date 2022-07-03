import React from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import styles from './LastWinnerPanel.module.scss';
import {selectGameIsRunning, selectLastWinner} from '../../store/selectors';
import ColumnPanel from '../../../components/ColumnPanel';

const LastWinnerPanel: React.FC = () => {
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	const lastWinner = useAppSelector(selectLastWinner);
	return !gameIsRunning && lastWinner ? <ColumnPanel title={'Победитель:'}>
		<p className={styles.nick}>{lastWinner}</p>
	</ColumnPanel> : null;
};

export default LastWinnerPanel;