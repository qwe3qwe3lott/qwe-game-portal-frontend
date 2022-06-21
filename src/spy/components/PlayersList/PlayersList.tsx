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
			<p className={styles.title}>{gameIsRunning ? 'Ходит игрок:' : 'Учавствовавшие игроки:'}</p>
			<ul className={styles.players}>
				{players.map(player => <li className={playerClass} key={player.id}>
					<span className={styles.score}>({player.score})</span> {player.nickname}
				</li>)}
			</ul>
		</div>}
	</>);
};

export default PlayersList;