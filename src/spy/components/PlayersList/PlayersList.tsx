import React, {useMemo} from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';

import styles from './PlayersList.module.scss';
import {selectGameIsRunning, selectPlayers} from '../../store/selectors';
import ColumnPanel from '../../../components/ColumnPanel';


const PlayersList: React.FC = () => {
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	const players = useAppSelector(selectPlayers);
	const playerClass = useMemo(() => {
		return [styles.player, gameIsRunning ? styles.playerInGame : ''].join(' ');
	}, [gameIsRunning]);
	return players.length > 0 ? <ColumnPanel title={gameIsRunning ? 'Ходит игрок:' : 'Учавствовавшие игроки:'}>
		<ul className={styles.players}>
			{players.map(player => <li className={playerClass} key={player.id}>
				<span className={styles.score}>({player.score})</span> {player.nickname}
			</li>)}
		</ul>
	</ColumnPanel> : null;
};

export default PlayersList;