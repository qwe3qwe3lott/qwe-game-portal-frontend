import React from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';

import styles from './MiniPlayersList.module.scss';
import {computeCurrentPlayer, selectGameIsRunning} from '../../store/selectors';
import MiniColumnPanel from '../../../components/MiniColumnPanel';


const MiniPlayersList: React.FC = () => {
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	return gameIsRunning ? <Content/> : null;
};

export default MiniPlayersList;

const Content: React.FC = () => {
	const player = useAppSelector(computeCurrentPlayer);
	return player ? <MiniColumnPanel>
		<p className={styles.player}>
			Ходит: <span className={styles.score}>({player.score})</span> {player.nickname}
		</p>
	</MiniColumnPanel> : null;
};