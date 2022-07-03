import React from 'react';
import {useNavigate} from 'react-router-dom';

import styles from './GamesList.module.scss';
import {routePath as spyRoutePath} from '../../spy/Router';
import {routePath as yesntRoutePath} from '../../yesnt/Router';
import ColumnPanel from '../ColumnPanel';

const GamesList: React.FC = () => {
	const navigate = useNavigate();
	return(<ColumnPanel title={'Список игр'} hugeTitle width={15}>
		<ul className={styles.list}>
			<li><button className={styles.button} onClick={() => navigate(`/${spyRoutePath}`)}>Шпион</button></li>
			<li><button className={styles.button} onClick={() => navigate(`/${yesntRoutePath}`)}>Данет</button></li>
		</ul>
	</ColumnPanel>);
};

export default GamesList;