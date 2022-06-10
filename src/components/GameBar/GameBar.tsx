import React from 'react';
import PlayersList from '../PlayersList';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import Timer from '../Timer';

type Props = {
	className?: string
}

const GameBar: React.FC<Props> = ({className}) => {
	const gameIsRunning = useAppSelector(state => state.spy.isRunning);

	return(<div style={{ border: '1px solid blue' }} className={className}>
		{gameIsRunning && <>
			<Timer/>
			<PlayersList/>
		</>}
	</div>);
};

export default GameBar;