import React from 'react';
import GameRoomSideBar from '../../components/GameRoomSideBar';
import GameTimer from '../../components/GameTimer';
import {
	computeCurrentPlayer,
	computeLastLogs,
	selectGameIsOnPause,
	selectGameIsRunning,
	selectLogs,
	selectPlayers,
	selectTimer
} from '../store/selectors';
import {useApi} from '../Api';
import playersListFactory from '../../components/GamePlayersList';
import {Player} from '../types/Player';
import PlayerItem from './PlayerItem';
import GameLogs from '../../components/GameLogs';
import MiniGameTimer from '../../components/MiniGameTimer';
import miniCurrentPlayerFactory from '../../components/MiniGameCurrentPlayer';

const PlayersList = playersListFactory<Player>();
const MiniCurrentPlayer = miniCurrentPlayerFactory<Player>();
type Props = {
    className?: string
}
const OptionsBar: React.FC<Props> = ({className}) => {
	const api = useApi();
	return(<GameRoomSideBar maxShowWidth={900} className={className} miniBar={<MiniBar/>} rightSide>
		<GameTimer api={api} selectTimer={selectTimer} selectGameIsOnPause={selectGameIsOnPause} selectGameIsRunning={selectGameIsRunning}/>
		<PlayersList selectGameIsRunning={selectGameIsRunning} selectPlayers={selectPlayers} Item={PlayerItem}/>
		<GameLogs selectGameIsRunning={selectGameIsRunning} selectLogs={selectLogs} computeLastLogs={computeLastLogs}/>
	</GameRoomSideBar>);
};

export default OptionsBar;

const MiniBar: React.FC = () => {
	const api = useApi();
	return <>
		<MiniGameTimer api={api} selectTimer={selectTimer} selectGameIsOnPause={selectGameIsOnPause} selectGameIsRunning={selectGameIsRunning}/>
		<MiniCurrentPlayer selectGameIsRunning={selectGameIsRunning} computeCurrentPlayer={computeCurrentPlayer} Item={PlayerItem}/>
	</>;
};