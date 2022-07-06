import React from 'react';

import styles from './HomePage.module.scss';
import GameCreateRoomPanel from '../../../components/GameCreateRoomPanel';
import {useApi} from '../../Api';
import ModalButton from '../../../components/ModalButton';

const HomePage: React.FC = () => {
	const api = useApi();
	return (<div className={styles.layout}>
		<GameCreateRoomPanel api={api} gameTitle={'Данет'}>
			<ModalButton label={'Правила'}>в разработке</ModalButton>
		</GameCreateRoomPanel>
	</div>);
};

export default HomePage;