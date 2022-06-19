import React, {useMemo} from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';

import styles from './PlayersList.module.scss';
import {selectGameIsRunning, selectPlayers} from '../../store/selectors';

const PlayersList: React.FC = () => {
	const players = useAppSelector(selectPlayers);
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	const playerClass = useMemo(() => {
		return [styles.player, gameIsRunning ? styles.playerInGame : ''].join(' ');
	}, [gameIsRunning]);
	return(<>
		{players.length > 0 &&<div className={styles.layout}>
			<p>{gameIsRunning ? 'Ходит игрок:' : 'Учавствовавшие игроки:'}</p>
			<ul>
				{players.map(player => <li className={playerClass} key={player.id}>
					{player.nickname} <span className={styles.score}>({player.score})</span>
				</li>)}
			</ul>
		</div>}
	</>);
};

export default PlayersList;