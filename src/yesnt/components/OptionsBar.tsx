import React from 'react';
import GameRoomSideBar from '../../components/GameRoomSideBar';
import {
	computeMembersRestriction,
	selectGameIsOnPause,
	selectGameIsRunning,
	selectIAmPlayer, selectMembers,
	selectOwnerKey,
	selectRestrictionsToStart
} from '../store/selectors';
import GameOwnerPanel from '../../components/GameOwnerPanel';
import {useApi} from '../Api';
import GameMemberPanel from '../../components/GameMemberPanel';
import GameMembersList from '../../components/GameMembersList';
import MiniGameOwnerPanel from '../../components/MiniGameOwnerPanel';
import MiniGameMemberPanel from '../../components/MiniGameMemberPanel';
import RoomOptionsForm from './RoomOptionsForm';
import RoomTitleForm from './RoomTitleForm';

type Props = {
    className?: string
}
const OptionsBar: React.FC<Props> = ({className}) => {
	const api = useApi();
	return(<GameRoomSideBar maxShowWidth={700} className={className} miniBar={<MiniBar/>}>
		<GameOwnerPanel
			api={api}
			selectOwnerKey={selectOwnerKey}
			selectGameIsRunning={selectGameIsRunning}
			selectGameIsOnPause={selectGameIsOnPause}
			selectRestrictionsToStart={selectRestrictionsToStart}
			RoomTitleForm={RoomTitleForm}
		/>
		<GameMemberPanel api={api} selectIAmPlayer={selectIAmPlayer} selectGameIsRunning={selectGameIsRunning} OptionsForm={RoomOptionsForm}/>
		<GameMembersList selectMembers={selectMembers} selectGameIsRunning={selectGameIsRunning} computeMembersRestriction={computeMembersRestriction}/>
	</GameRoomSideBar>);
};

export default OptionsBar;

const MiniBar: React.FC = () => {
	const api = useApi();
	return <>
		<MiniGameOwnerPanel
			api={api}
			selectOwnerKey={selectOwnerKey}
			selectGameIsRunning={selectGameIsRunning}
			selectGameIsOnPause={selectGameIsOnPause}
			selectRestrictionsToStart={selectRestrictionsToStart}
			RoomTitleForm={RoomTitleForm}
		/>
		<MiniGameMemberPanel api={api} selectIAmPlayer={selectIAmPlayer} selectGameIsRunning={selectGameIsRunning} OptionsForm={RoomOptionsForm}/>
	</>;
};
