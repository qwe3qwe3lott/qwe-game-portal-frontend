import React, {useEffect} from 'react';
import OptionsBar from '../OptionsBar';
import GameField from '../GameField';
import GameBar from '../GameBar';
import RoomBar from '../RoomBar';

import styles from './Room.module.scss';
import {useApi} from '../../Api';

const Room: React.FC = () => {
	const api = useApi();
	useEffect(() => {
		api.become(true);
		return () => {
			api.leaveRoom();
		};
	}, []);
	return(<div className={styles.layout}>
		<RoomBar className={styles.roomBar}/>
		<OptionsBar className={styles.optionsBar}/>
		<GameField className={styles.gameField}/>
		<GameBar className={styles.gameBar}/>
	</div>);
};

export default Room;