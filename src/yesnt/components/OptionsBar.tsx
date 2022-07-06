import React from 'react';
import SideBar from '../../components/SideBar';
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

type Props = {
    className?: string
}
const OptionsBar: React.FC<Props> = ({className}) => {
	const api = useApi();
	return(<SideBar maxShowWidth={700} className={className} miniBar={<MiniBar/>}>
		<GameOwnerPanel
			api={api}
			selectOwnerKey={selectOwnerKey}
			selectGameIsRunning={selectGameIsRunning}
			selectGameIsOnPause={selectGameIsOnPause}
			selectRestrictionsToStart={selectRestrictionsToStart}
		/>
		<GameMemberPanel api={api} selectIAmPlayer={selectIAmPlayer} selectGameIsRunning={selectGameIsRunning}>

		</GameMemberPanel>
		<GameMembersList selectMembers={selectMembers} selectGameIsRunning={selectGameIsRunning} computeMembersRestriction={computeMembersRestriction}/>
	</SideBar>);
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
		/>
		<MiniGameMemberPanel api={api} selectIAmPlayer={selectIAmPlayer} selectGameIsRunning={selectGameIsRunning}/>
	</>;
};
