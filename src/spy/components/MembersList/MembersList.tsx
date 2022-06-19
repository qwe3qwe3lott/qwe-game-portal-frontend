import React from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import globalColors from '../../../colors.scss';

import styles from './MembersList.module.scss';
import {computeMembersRestriction, selectGameIsRunning, selectMembers} from '../../store/selectors';

const MembersList: React.FC = () => {
	const members = useAppSelector(selectMembers);
	return(<div className={styles.layout}>
		<p>Участники:</p>
		<ol className={styles.members}>
			{members.map((member, key) => <li
				className={styles.member}
				key={key}
				style={{ color: member.isPlayer ? globalColors.secondaryColor : globalColors.secondaryOppositeColor }}
			>
				{member.nickname}
			</li>)}
		</ol>
		<Info/>
	</div>);
};

export default MembersList;

const Info: React.FC = () => {
	const membersRestriction = useAppSelector(computeMembersRestriction);
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	return(<>
		{!gameIsRunning && <p className={styles.info}>Готовы: {membersRestriction}</p>}
	</>);
};