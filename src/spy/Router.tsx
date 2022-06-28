import React, {useEffect, useState} from 'react';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErrorPage from '../pages/ErrorPage';
import RoomPage from './pages/RoomPage';
import {useApi} from './api';

const Router: React.FC = () => {
	const api = useApi();
	const [connected, setConnected] = useState(false);
	useEffect(() => {
		api.subscribe();
		const socket = api.socket;
		if (!socket) return;
		const handler = () => {
			setConnected(socket.connected);
		};
		socket.on('connect', handler);
		socket.on('disconnect', handler);
		return () => {
			socket.off('connect', handler);
			socket.off('disconnect', handler);
			api.describe();
		};
	}, []);
	return(<Routes>
		<Route element={<Outlet/>}>
			{!connected && <Route path={'*'} element={<ErrorPage/>}/>}
			{connected && <>
				<Route index element={<HomePage/>}/>
				<Route path={':roomId'} element={<RoomPage/>}/>
				<Route path={'*'} element={<Navigate to={`/${routePath}`}/>}/>
			</>}
		</Route>
	</Routes>);
};

export default Router;

export const routePath = 'spy';