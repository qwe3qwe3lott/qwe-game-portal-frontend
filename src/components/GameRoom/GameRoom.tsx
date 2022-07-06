import React, {useEffect} from 'react';
import styles from './GameRoom.module.scss';
import {GameApi} from '../../abstracts/GameApi';
import {GamePlayer} from '../../types/GamePlayer';
import {GameRoomStatus} from '../../types/GameRoomStatus';
import {GameRoomOptions} from '../../types/GameRoomOptions';

type PropsOfFC = {
	className?: string
}
type Props = {
	api: GameApi<GamePlayer, GameRoomStatus, GameRoomOptions>
	RoomBar: React.FC<PropsOfFC>
	OptionsBar: React.FC<PropsOfFC>
	GameField: React.FC<PropsOfFC>
	GameBar: React.FC<PropsOfFC>
}
const GameRoom: React.FC<Props> = ({api, GameBar, GameField, OptionsBar, RoomBar}) => {
	useEffect(() => {
		api.become(true);
		return () => api.leaveRoom();
	}, []);
	return(<div className={styles.layout}>
		<RoomBar className={styles.roomBar}/>
		<OptionsBar className={styles.optionsBar}/>
		<GameField className={styles.gameField}/>
		<GameBar className={styles.gameBar}/>
	</div>);
};

export default GameRoom;