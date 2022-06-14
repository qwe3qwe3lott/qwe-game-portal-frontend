import React from 'react';
import PlayersList from '../PlayersList';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import Timer from '../Timer';
import Card from '../Card';
import Logs from '../Logs';

import styles from './GameBar.module.scss';

type Props = {
	className?: string
}

const GameBar: React.FC<Props> = ({className}) => {
	const gameIsRunning = useAppSelector(state => state.spy.isRunning);
	const card = useAppSelector(state => state.spy.card);

	return(<div className={[className, styles.layout].join(' ')}>
		{gameIsRunning && <>
			<Timer/>
			<PlayersList/>
			{card && <Card card={card} isDeco={true}/>}
			<Logs/>
		</>}
	</div>);
};

export default GameBar;