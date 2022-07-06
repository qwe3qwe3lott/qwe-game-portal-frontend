import React, {useCallback} from 'react';

import styles from './ErrorPage.module.scss';
import {useNavigate} from 'react-router-dom';
import ColumnPanel from '../../components/ColumnPanel';
const ErrorPage: React.FC = () => {
	const navigate = useNavigate();
	const exitHandler = useCallback(() => {
		navigate('/');
	}, []);
	return(<div className={styles.layout}>
		<ColumnPanel title={'По какой-то причине вы не смогли подключиться к нашему серверу'} width={20} center>
			<button className={styles.button} onClick={exitHandler}>К списку игр</button>
		</ColumnPanel>
	</div>);
};

export default ErrorPage;