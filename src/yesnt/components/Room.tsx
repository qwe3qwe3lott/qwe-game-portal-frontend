import React from 'react';
import {useApi} from '../Api';
import RoomBar from './RoomBar';
import OptionsBar from './OptionsBar';
import GameBar from './GameBar';
import GameRoom from '../../components/GameRoom';
import GameField from './GameField';

const Room: React.FC = () => {
	const api = useApi();
	return <GameRoom api={api} RoomBar={RoomBar} OptionsBar={OptionsBar} GameField={GameField} GameBar={GameBar}/>;
};

export default Room;