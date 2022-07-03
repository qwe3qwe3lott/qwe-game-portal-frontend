import React from 'react';
import {useApi} from '../Api';
import {selectGameIsOnPause, selectGameIsRunning, selectOwnerKey, selectRestrictionsToStart} from '../store/selectors';
import MiniGameOwnerPanel from '../../components/MiniGameOwnerPanel';

const MiniOwnerPanel: React.FC = () => {
	const api = useApi();
	return <MiniGameOwnerPanel
		api={api}
		selectOwnerKey={selectOwnerKey}
		selectGameIsRunning={selectGameIsRunning}
		selectGameIsOnPause={selectGameIsOnPause}
		selectRestrictionsToStart={selectRestrictionsToStart}
	/>;
};

export default MiniOwnerPanel;