import React from 'react';
import SideBar from '../../components/SideBar';
import OwnerPanel from './OwnerPanel';
import MemberPanel from './MemberPanel';
import MembersList from './MembersList';
import MiniOwnerPanel from './MiniOwnerPanel';
import MiniMembersPanel from './MiniMembersPanel';

type Props = {
    className?: string
}
const OptionsBar: React.FC<Props> = ({className}) => {
	return(<SideBar maxShowWidth={700} className={className} miniBar={MiniBar}>
		<OwnerPanel/>
		<MemberPanel/>
		<MembersList/>
	</SideBar>);
};

export default OptionsBar;

const MiniBar = <>
	<MiniOwnerPanel/>
	<MiniMembersPanel/>
</>;
