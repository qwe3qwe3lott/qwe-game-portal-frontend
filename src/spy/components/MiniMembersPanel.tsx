import React from 'react';
import MiniGameMemberPanel from '../../components/MiniGameMemberPanel';
import {useApi} from '../Api';
import {selectGameIsRunning, selectIAmPlayer} from '../store/selectors';

const MiniMembersPanel: React.FC = () => {
	const api = useApi();
	return <MiniGameMemberPanel api={api} selectIAmPlayer={selectIAmPlayer} selectGameIsRunning={selectGameIsRunning}/>;
};

export default MiniMembersPanel;