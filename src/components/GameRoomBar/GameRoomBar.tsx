import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './GameRoomBar.module.scss';
import {RootState} from '../../store';
import {useAppSelector} from '../../hooks/typedReduxHooks';

type Props = {
	className?: string
	routePath: string
	children?: React.ReactNode
	gameTitle: string
	selectRoomTitle: (state: RootState) => string
}
const GameRoomBar: React.FC<Props> = ({className, routePath, children, gameTitle, selectRoomTitle}) => {
	return(<div className={`${className} ${styles.layout}`}>
		<TitleBar gameTitle={gameTitle} selectRoomTitle={selectRoomTitle}/>
		<ButtonsBar routePath={routePath}>
			{children}
		</ButtonsBar>
	</div>);
};

export default GameRoomBar;

type TitleBarProps = {
	gameTitle: string
	selectRoomTitle: (state: RootState) => string
}
const TitleBar: React.FC<TitleBarProps> = ({gameTitle, selectRoomTitle}) => {
	const roomTitle = useAppSelector(selectRoomTitle);
	return <div className={styles.titleLayout}>
		<p>{`Игра "${gameTitle}"`}</p>
		<p className={styles.roomTitle}>{`Комната "${roomTitle}"`}</p>
	</div>;
};

type ButtonsBarProps = {
	routePath: string
	children?: React.ReactNode
}
const ButtonsBar: React.FC<ButtonsBarProps> = ({children, routePath}) => {
	const navigate = useNavigate();
	const exitHandler = () => navigate(`/${routePath}`);
	return(<div className={styles.buttonsLayout}>
		<CopyLinkButton/>
		{children}
		<button className={styles.button} style={{ placeSelf: 'center end'}} onClick={exitHandler}>Выйти</button>
	</div>);
};

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