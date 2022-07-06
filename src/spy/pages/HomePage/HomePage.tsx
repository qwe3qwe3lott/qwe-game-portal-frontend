import React from 'react';

import styles from './HomePage.module.scss';
import Rules from '../../components/Rules';
import GameCreateRoomPanel from '../../../components/GameCreateRoomPanel';
import {useApi} from '../../Api';
import ModalButton from '../../../components/ModalButton';

const HomePage: React.FC = () => {
	const api = useApi();
	return (<div className={styles.layout}>
		<GameCreateRoomPanel api={api} gameTitle={'Шпион'}>
			<ModalButton label={'Правила'}><Rules/></ModalButton>
		</GameCreateRoomPanel>
	</div>);
};

export default HomePage;