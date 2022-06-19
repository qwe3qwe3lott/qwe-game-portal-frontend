import React from 'react';
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

	return(<div className={[className, styles.layout].join(' ')}>
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
	</div>);
};

export default GameBar;