import React from 'react';
import {useApi} from '../Api';
import RoomBar from './RoomBar';
import OptionsBar from './OptionsBar';
import GameField from './GameField';
import GameBar from './GameBar';
import GameRoom from '../../components/GameRoom';

const Room: React.FC = () => {
	const api = useApi();
	return <GameRoom api={api} RoomBar={RoomBar} OptionsBar={OptionsBar} GameField={GameField} GameBar={GameBar}/>;
};

export default Room;