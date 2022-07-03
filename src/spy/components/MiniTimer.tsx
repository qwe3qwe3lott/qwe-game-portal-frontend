import React from 'react';
import {useApi} from '../Api';
import {selectGameIsOnPause, selectGameIsRunning, selectTimer} from '../store/selectors';
import MiniGameTimer from '../../components/MiniGameTimer';

const MiniTimer: React.FC = () => {
	const api = useApi();
	return <MiniGameTimer api={api} selectTimer={selectTimer} selectGameIsOnPause={selectGameIsOnPause} selectGameIsRunning={selectGameIsRunning}/>;
};

export default MiniTimer;