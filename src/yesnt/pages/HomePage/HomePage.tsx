import React from 'react';

import styles from './HomePage.module.scss';
import GameCreateRoomPanel from '../../../components/GameCreateRoomPanel';
import {useApi} from '../../Api';

const HomePage: React.FC = () => {
	const api = useApi();
	return (<div className={styles.layout}>
		<GameCreateRoomPanel api={api} gameTitle={'Данет'}/>
	</div>);
};

export default HomePage;