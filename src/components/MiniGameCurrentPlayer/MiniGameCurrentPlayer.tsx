import React from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';

import styles from './MiniGameCurrentPlayer.module.scss';
import {RootState} from '../../store';
import {GamePlayer} from '../../types/GamePlayer';
import MiniColumnPanel from '../MiniColumnPanel';

type PropsOfItem<P extends GamePlayer> = {
	player: P
	gameIsRunning?: boolean
	current?: boolean
}
type Props<P extends GamePlayer> = {
	selectGameIsRunning: (state: RootState) => boolean
	computeCurrentPlayer: (state: RootState) => P | undefined
	Item: React.FC<PropsOfItem<P>>
}
const miniCurrentPlayerFactory = <P extends GamePlayer>() => {
	const MiniGameCurrentPlayer: React.FC<Props<P>> = ({selectGameIsRunning, computeCurrentPlayer, Item}) => {
		const gameIsRunning = useAppSelector(selectGameIsRunning);
		const player = useAppSelector(computeCurrentPlayer);
		return gameIsRunning && player ? <MiniColumnPanel>
			<p className={styles.player}>
				Ходит: <Item player={player} current/>
			</p>
		</MiniColumnPanel> : null;
	};
	return MiniGameCurrentPlayer;
};

export default miniCurrentPlayerFactory;