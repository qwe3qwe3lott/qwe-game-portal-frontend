import React from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';

import styles from './PlayersList.module.scss';
import ColumnPanel from '../../components/ColumnPanel';
import {RootState} from '../../store';
import {GamePlayer} from '../../types/GamePlayer';

type PropsOfItem<P extends GamePlayer> = {
	player: P
	gameIsRunning: boolean
}
type Props<P extends GamePlayer> = {
	selectGameIsRunning: (state: RootState) => boolean
	selectPlayers: (state: RootState) => P[]
	Item: React.FC<PropsOfItem<P>>
}
const playersListFactory = <P extends GamePlayer>() => {
	const GamePlayersList: React.FC<Props<P>> = ({selectGameIsRunning, selectPlayers, Item}) => {
		const gameIsRunning = useAppSelector(selectGameIsRunning);
		const players = useAppSelector(selectPlayers);
		return players.length > 0 ? <ColumnPanel title={gameIsRunning ? 'Ходит игрок:' : 'Учавствовавшие игроки:'} center>
			<ul className={styles.players}>
				{players.map(player => <Item player={player} gameIsRunning={gameIsRunning} key={player.id}/>)}
			</ul>
		</ColumnPanel> : null;
	};
	return GamePlayersList;
};

export default playersListFactory;