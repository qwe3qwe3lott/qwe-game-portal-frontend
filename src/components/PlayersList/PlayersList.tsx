import React from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';

import styles from './PlayersList.module.scss';

const PlayersList: React.FC = () => {
	const players = useAppSelector(state => state.spy.players);
	return(<div className={styles.layout}>
		<p>Ходит игрок:</p>
		<ul>
			{players.map(player => <li className={styles.player} key={player.id}>
				{player.nickname} <span className={styles.score}>({player.score})</span>
			</li>)}
		</ul>
	</div>);
};

export default PlayersList;