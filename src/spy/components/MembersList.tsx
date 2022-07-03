import React from 'react';
import {computeMembersRestriction, selectGameIsRunning, selectMembers} from '../store/selectors';
import GameMembersList from '../../components/GameMembersList';

const MembersList: React.FC = () =>
	<GameMembersList selectMembers={selectMembers} selectGameIsRunning={selectGameIsRunning} computeMembersRestriction={computeMembersRestriction}/>;

export default MembersList;