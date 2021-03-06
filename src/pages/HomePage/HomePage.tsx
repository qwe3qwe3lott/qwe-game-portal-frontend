import React from 'react';
import GamesList from '../../components/GamesList';

import styles from './HomePage.module.scss';

const HomePage: React.FC = () => {
	return(<div className={styles.layout}>
		<GamesList/>
	</div>);
};

export default HomePage;