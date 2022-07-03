import React from 'react';
import SideBar from '../../components/SideBar';
import Timer from './Timer';
import MiniTimer from './MiniTimer';
import LastWinnerPanel from './LastWinnerPanel';
import PlayersList from './PlayersList';
import MiniPlayersList from './MiniPlayersList';
import CardPanel from './CardPanel';
import Logs from './Logs';

type Props = {
    className?: string
}
const OptionsBar: React.FC<Props> = ({className}) => {
	return(<SideBar maxShowWidth={900} className={className} miniBar={MiniBar} rightSide>
		<LastWinnerPanel/>
		<Timer/>
		<PlayersList/>
		<CardPanel/>
		<Logs/>
	</SideBar>);
};

export default OptionsBar;

const MiniBar = <>
	<MiniTimer/>
	<MiniPlayersList/>
</>;
