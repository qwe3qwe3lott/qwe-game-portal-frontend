import React from 'react';
import PlayersList from '../PlayersList';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import Timer from '../Timer';
import Card from '../Card';

type Props = {
	className?: string
}

const GameBar: React.FC<Props> = ({className}) => {
	const gameIsRunning = useAppSelector(state => state.spy.isRunning);
	const card = useAppSelector(state => state.spy.card);

	return(<div style={{ border: '1px solid blue' }} className={className}>
		{gameIsRunning && <>
			<Timer/>
			<PlayersList/>
			{card && <Card card={card} isDeco={true}/>}
		</>}
	</div>);
};

export default GameBar;