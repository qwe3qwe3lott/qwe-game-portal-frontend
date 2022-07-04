import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './GameRoomBar.module.scss';

type Props = {
	className?: string
	routePath: string
	children?: React.ReactNode
}
const GameRoomBar: React.FC<Props> = ({className, routePath, children}) => {
	const navigate = useNavigate();
	const exitHandler = () => navigate(`/${routePath}`);
	const copyHandler = () => navigator.clipboard.writeText(window.location.href);
	return(<div className={[className, styles.layout].join(' ')}>
		<button className={styles.button} style={{ placeSelf: 'center start'}} onClick={copyHandler}>Скопировать ссылку</button>
		{children}
		<button className={styles.button} style={{ placeSelf: 'center end'}} onClick={exitHandler}>Выйти</button>
	</div>);
};

export default GameRoomBar;