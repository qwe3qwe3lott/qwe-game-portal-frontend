import React, {useMemo} from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';

import styles from './PlayersList.module.scss';

const PlayersList: React.FC = () => {
	const players = useAppSelector(state => state.spy.players);
	const gameIsRunning = useAppSelector(state => state.spy.isRunning);
	const playerClass = useMemo(() => {
		return [styles.player, gameIsRunning ? styles.playerInGame : ''].join(' ');
	}, [gameIsRunning]);
	return(<>
		{players.length > 0 &&<div className={styles.layout}>
			{gameIsRunning && <p>Ходит игрок:</p>}
			<ul>
				{players.map(player => <li className={playerClass} key={player.id}>
					{player.nickname} <span className={styles.score}>({player.score})</span>
				</li>)}
			</ul>
		</div>}
	</>);
};

export default PlayersList;