import React from 'react';

import styles from './PlayerItem.module.scss';
import {Player} from '../../types/Player';

type Props = {
	player: Player
	gameIsRunning: boolean
}
const PlayerItem: React.FC<Props> = ({player, gameIsRunning}) => {
	const playerClass = `${styles.player} ${gameIsRunning ? styles.playerInGame : ''}`;
	return <li className={playerClass} key={player.id}>
		<span className={styles.score}>({player.score})</span> {player.nickname}
	</li>;
};

export default PlayerItem;