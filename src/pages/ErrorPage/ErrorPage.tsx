import React, {useCallback} from 'react';

import styles from './ErrorPage.module.scss';
import {useNavigate} from 'react-router-dom';
const ErrorPage: React.FC = () => {
	const navigate = useNavigate();
	const exitHandler = useCallback(() => {
		navigate('/');
	}, []);
	return(<div className={styles.layout}>
		<div className={styles.panel}>
			<p className={styles.title}>По какой-то причине вы не смогли подключиться к нашему серверу</p>
			<button className={styles.button} onClick={exitHandler}>К списку игр</button>
		</div>
	</div>);
};

export default ErrorPage;