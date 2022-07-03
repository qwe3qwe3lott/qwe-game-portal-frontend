import React, {useCallback, useMemo, useState} from 'react';
import PlayersList from '../PlayersList';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import Timer from '../Timer';
import Logs from '../Logs';

import styles from './GameBar.module.scss';
import CardPanel from '../CardPanel';
import LastWinnerPanel from '../LastWinnerPanel';
import {selectGameIsRunning} from '../../store/selectors';

type Props = {
	className?: string
}

const GameBar: React.FC<Props> = ({className}) => {
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	const [hidden, setHidden] = useState(window.screen.width < 900);
	const layoutClass = useMemo(() => {
		return [className, styles.layout, (hidden ? styles.hiddenLayout : '')].join(' ');
	}, [hidden]);
	const buttonClass = useMemo(() => {
		return [styles.button, (hidden ? styles.buttonHidden : '')].join(' ');
	}, [hidden]);
	const clickHandler = useCallback(() => {
		setHidden(!hidden);
	}, [hidden]);
	return(<div className={layoutClass}>
		<button className={buttonClass} onClick={clickHandler}/>
		{hidden ? <>
			{gameIsRunning && <>
				<PlayersList/>
			</>}
		</> : <>
			{gameIsRunning ? <>
				<Timer/>
				<PlayersList/>
				<CardPanel/>
				<Logs/>
			</> : <>
				<LastWinnerPanel/>
				<PlayersList/>
				<Logs/>
			</>}
		</>}
	</div>);
};

export default GameBar;