import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

import styles from './RoomBar.module.scss';
import Rules from '../Rules';
import {routePath} from '../../Router';
import ModalButton from '../../../components/ModalButton';

type Props = {
	className?: string
}

const RoomBar: React.FC<Props> = ({className}) => {
	const navigate = useNavigate();

	const exitHandler = useCallback(() => {
		navigate(`/${routePath}`);
	}, []);

	const copyHandler = useCallback(() => {
		navigator.clipboard.writeText(window.location.href);
	}, []);

	return(<div className={[className, styles.layout].join(' ')}>
		<button className={styles.button} style={{ placeSelf: 'center start'}} onClick={copyHandler}>Скопировать ссылку</button>
		<ModalButton label={'Правила'} inRoomBar><Rules/></ModalButton>
		<button className={styles.button} style={{ placeSelf: 'center end'}} onClick={exitHandler}>Выйти</button>
	</div>);
};

export default RoomBar;