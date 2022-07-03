import React from 'react';
import {useApi} from '../Api';
import GameOwnerPanel from '../../components/GameOwnerPanel';
import {
	selectGameIsOnPause,
	selectGameIsRunning,
	selectOwnerKey,
	selectRestrictionsToStart
} from '../store/selectors';

const OwnerPanel: React.FC = () => {
	const api = useApi();
	return <GameOwnerPanel
		api={api}
		selectOwnerKey={selectOwnerKey}
		selectGameIsRunning={selectGameIsRunning}
		selectGameIsOnPause={selectGameIsOnPause}
		selectRestrictionsToStart={selectRestrictionsToStart}
	/>;
};

export default OwnerPanel;