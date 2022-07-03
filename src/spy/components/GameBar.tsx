import React from 'react';
import SideBar from '../../components/SideBar';

type Props = {
    className?: string
}
const OptionsBar: React.FC<Props> = ({className}) => {
	return(<SideBar maxShowWidth={900} className={className} miniBar={MiniBar}>
		таймер сделать
	</SideBar>);
};

export default OptionsBar;

const MiniBar = <>
	m
</>;
