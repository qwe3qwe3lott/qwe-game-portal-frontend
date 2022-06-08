import React from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';

const MembersList: React.FC = () => {
	const members = useAppSelector(state => state.spy.members);
	return(<ul>
		{members.map((member, key) => <li key={key} style={{ color: member.isPlayer ? 'green' : 'red' }}>
			{member.nickname}
		</li>)}
	</ul>);
};

export default MembersList;