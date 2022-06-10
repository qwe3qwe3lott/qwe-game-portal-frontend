import React from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';

const PlayersList: React.FC = () => {
	const players = useAppSelector(state => state.spy.players);
	return(<ul>
		{players.map(player => <li key={player.id}>
			{player.nickname} ({player.score})
		</li>)}
	</ul>);
};

export default PlayersList;