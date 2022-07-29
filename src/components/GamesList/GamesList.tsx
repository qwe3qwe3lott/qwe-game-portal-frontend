import React from 'react';
import {useNavigate} from 'react-router-dom';

import styles from './GamesList.module.scss';
import {routePath as spyRoutePath, gameTitle as spyGameTitle} from '../../spy/Router';
import {routePath as yesntRoutePath, gameTitle as yesntGameTitle} from '../../yesnt/Router';
import ColumnPanel from '../ColumnPanel';

const GamesList: React.FC = () => {
	const navigate = useNavigate();
	return(<ColumnPanel title={'Список игр'} hugeTitle width={15}>
		<ul className={styles.list}>
			<li><button className={styles.button} onClick={() => navigate(`/${spyRoutePath}`)}>{spyGameTitle}</button></li>
			<li><button className={styles.button} onClick={() => navigate(`/${yesntRoutePath}`)}>{yesntGameTitle}</button></li>
		</ul>
	</ColumnPanel>);
};

export default GamesList;