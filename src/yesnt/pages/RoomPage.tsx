import React from 'react';
import GameRoomPage from '../../pages/GameRoomPage';
import {useApi} from '../Api';
import {routePath} from '../Router';
import Room from '../components/Room';
import {clearStoreAfterLeaving} from '../store';

const RoomPage: React.FC = () => {
	const api = useApi();
	return <GameRoomPage api={api} routePath={routePath} Room={Room} clearStoreAfterLeaving={clearStoreAfterLeaving}/>;
};

export default RoomPage;