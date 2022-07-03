import React from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import globalColors from '../../colors.scss';

import styles from './GameMembersList.module.scss';
import {Member} from '../../types/Member';
import ColumnPanel from '../ColumnPanel';
import {RootState} from '../../store';

type Props = {
	selectMembers: (state: RootState) => Member[]
	selectGameIsRunning: (state: RootState) => boolean
	computeMembersRestriction: (state: RootState) => string
}
const GameMembersList: React.FC<Props> = ({selectMembers, selectGameIsRunning, computeMembersRestriction}) => {
	const members = useAppSelector(selectMembers);
	return(<ColumnPanel title={'Участники:'}>
		<ol className={styles.members}>
			{members.map((member, key) => <li
				className={styles.member}
				key={key}
				style={{ color: member.isPlayer ? globalColors.secondaryColor : globalColors.secondaryOppositeColor }}
			>{member.nickname}</li>)}
		</ol>
		<Restriction selectGameIsRunning={selectGameIsRunning} computeMembersRestriction={computeMembersRestriction}/>
	</ColumnPanel>);
};

export default GameMembersList;

type RestrictionProps = {
	selectGameIsRunning: (state: RootState) => boolean
	computeMembersRestriction: (state: RootState) => string
}
const Restriction: React.FC<RestrictionProps> = ({computeMembersRestriction, selectGameIsRunning}) => {
	const membersRestriction = useAppSelector(computeMembersRestriction);
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	return gameIsRunning ? null : <p className={styles.restriction}>Готовы: {membersRestriction}</p>;
};