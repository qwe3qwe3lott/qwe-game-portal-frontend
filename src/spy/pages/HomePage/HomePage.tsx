import React from 'react';

import styles from './HomePage.module.scss';
import CreateRoomPanel from '../../components/CreateRoomPanel';

const HomePage: React.FC = () => {
	return (<div className={styles.layout}>
		<CreateRoomPanel/>
	</div>);
};

export default HomePage;