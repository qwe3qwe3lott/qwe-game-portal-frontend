import React from 'react';
import RoomPage from './pages/RoomPage';
import HomePage from './pages/HomePage';
import {useApi} from './Api';
import GameRouter from '../components/GameRouter';

const Router: React.FC = () => {
	const api = useApi();
	return <GameRouter api={api} homePage={<HomePage/>} roomPage={<RoomPage/>}/>;
};

export default Router;

export const routePath = 'yesnt';