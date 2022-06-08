import React from 'react';
import PlayersList from '../PlayersList';
import {useAppSelector} from '../../hooks/typedReduxHooks';

type Props = {
	className?: string
}

const GameBar: React.FC<Props> = ({className}) => {
	const gameIsRunning = useAppSelector(state => state.spy.isRunning);
	const iAmActing = useAppSelector(state => state.spy.iAmActing);

	return(<div style={{ border: '1px solid blue' }} className={className}>
		{gameIsRunning && <>
			{iAmActing && <p>I am acting</p>}
			<PlayersList/>
		</>}
	</div>);
};

export default GameBar;