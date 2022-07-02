import React from 'react';
import {useNavigate} from 'react-router-dom';

import styles from './GamesList.module.scss';
import {routePath as spyRoutePath} from '../../spy/Router';
import {routePath as yesntRoutePath} from '../../yesnt/Router';

const GamesList: React.FC = () => {
	const navigate = useNavigate();
	return(<div className={styles.layout}>
		<p className={styles.title}>Список игр</p>
		<ul className={styles.list}>
			<li className={styles.item}><button className={styles.button} onClick={() => navigate(`/${spyRoutePath}`)}>Шпион</button></li>
			<li className={styles.item}><button className={styles.button} onClick={() => navigate(`/${yesntRoutePath}`)}>Данет</button></li>
		</ul>
	</div>);
};

export default GamesList;