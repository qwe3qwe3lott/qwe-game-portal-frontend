import React from 'react';
import MembersList from '../MembersList';
import MemberPanel from '../MemberPanel';
import OwnerPanel from '../OwnerPanel';
import {useAppSelector} from '../../hooks/typedReduxHooks';

type Props = {
	className?: string
}

const OptionsBar: React.FC<Props> = ({className}) => {
	const ownerKey = useAppSelector(state => state.spy.ownerKey);

	return(<div style={{ border: '1px solid red' }} className={className}>
		{ownerKey && <OwnerPanel/>}
		<MemberPanel/>
		<MembersList/>
	</div>);
};

export default OptionsBar;