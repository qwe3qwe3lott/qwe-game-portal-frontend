import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import spyAPI from '../../api';

import styles from './RoomBar.module.scss';

type Props = {
	className?: string
}

const RoomBar: React.FC<Props> = ({className}) => {
	const navigate = useNavigate();

	const exitHandler = useCallback(() => {
		spyAPI.leaveRoom();
		navigate('/spy');
	}, []);

	const copyHandler = useCallback(() => {
		navigator.clipboard.writeText(window.location.href);
	}, []);

	return(<div className={[className, styles.layout].join(' ')}>
		<button className={styles.button} onClick={copyHandler}>Скопировать ссылку</button>
		<button className={styles.button} onClick={exitHandler}>Выйти</button>
	</div>);
};

export default RoomBar;