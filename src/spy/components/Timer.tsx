import React from 'react';
import {useApi} from '../Api';
import GameTimer from '../../components/GameTimer';
import {selectGameIsOnPause, selectGameIsRunning, selectTimer} from '../store/selectors';

const Timer: React.FC = () => {
	const api = useApi();
	return <GameTimer api={api} selectTimer={selectTimer} selectGameIsOnPause={selectGameIsOnPause} selectGameIsRunning={selectGameIsRunning}/>;
};

export default Timer;