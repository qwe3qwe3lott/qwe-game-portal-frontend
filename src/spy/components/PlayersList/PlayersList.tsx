import React, {useMemo} from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';

import styles from './PlayersList.module.scss';
import {computeCurrentPlayer, selectGameIsRunning, selectPlayers} from '../../store/selectors';

type Props = {
	miniPanel?: boolean
}
const PlayersList: React.FC<Props> = ({ miniPanel }) =>
	miniPanel ? <MiniPlayersList/> : <NormalPlayersList/>;

export default PlayersList;

const NormalPlayersList: React.FC = () => {
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	const players = useAppSelector(selectPlayers);
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

const MiniPlayersList: React.FC = () => {
	const player = useAppSelector(computeCurrentPlayer);
	return(<>
		{player && <p className={styles.miniPlayer}>
			<span className={styles.score}>({player.score})</span> {player.nickname}
		</p>}
	</>);
};