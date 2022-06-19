import React from 'react';
import {useNavigate} from 'react-router-dom';

import styles from './GamesList.module.scss';

const GamesList: React.FC = () => {
	const navigate = useNavigate();
	return(<div className={styles.layout}>
		<p className={styles.title}>Список игр</p>
		<ul className={styles.list}>
			<li className={styles.item}><button className={styles.button} onClick={() => navigate('/spy')}>Шпион</button></li>
		</ul>
	</div>);
};

export default GamesList;