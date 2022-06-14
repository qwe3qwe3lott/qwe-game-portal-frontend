import React from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import globalColors from '../../colors.scss';

import styles from './MembersList.module.scss';

const MembersList: React.FC = () => {
	const members = useAppSelector(state => state.spy.members);
	return(<div className={styles.layout}>
		<p>Участники</p>
		<ul>
			{members.map((member, key) => <li key={key} style={{ color: member.isPlayer ? globalColors.secondaryColor : globalColors.secondaryOppositeColor }}>
				{member.nickname}
			</li>)}
		</ul>
	</div>);
};

export default MembersList;