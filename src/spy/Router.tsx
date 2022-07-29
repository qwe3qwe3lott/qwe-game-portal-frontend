import React from 'react';
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import {useApi} from './Api';
import GameRouter from '../components/GameRouter';

const Router: React.FC = () => {
	const api = useApi();
	return <GameRouter api={api} homePage={<HomePage/>} roomPage={<RoomPage/>}/>;
};

export default Router;

export const routePath = 'spy';
export const gameTitle = 'Шпион';