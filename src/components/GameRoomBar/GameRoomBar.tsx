import React, {useEffect, useState} from 'react';
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
	return(<div className={[className, styles.layout].join(' ')}>
		<CopyLinkButton/>
		{children}
		<button className={styles.button} style={{ placeSelf: 'center end'}} onClick={exitHandler}>Выйти</button>
	</div>);
};

export default GameRoomBar;

const CopyLinkButton: React.FC = () => {
	const [copied, setCopied] = useState(false);
	const copyHandler = async () => {
		if (copied) return;
		await navigator.clipboard.writeText(window.location.href);
		setCopied(true);
	};
	useEffect(() => {
		if (!copied) return;
		const timeout = setTimeout(() => {
			setCopied(false);
		}, 3000);
		return () => {
			clearTimeout(timeout);
		};
	}, [copied]);
	return <button className={styles.button} style={{ placeSelf: 'center start'}} onClick={copyHandler}>
		{copied ? 'Ссылка скопирована' : 'Скопировать ссылку'}
	</button>;
};