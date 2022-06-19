import React, {useEffect, useState} from 'react';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import spyAPI from './api';
import ErrorPage from '../pages/ErrorPage';
import RoomPage from './pages/RoomPage';

const Router: React.FC = () => {
	const [connected, setConnected] = useState(false);
	useEffect(() => {
		spyAPI.subscribe();
		const socket = spyAPI.socket;
		if (!socket) return;
		const handler = () => {
			setConnected(socket.connected);
		};
		socket.on('connect', handler);
		socket.on('disconnect', handler);
		return () => {
			socket.off('connect', handler);
			socket.off('disconnect', handler);
			spyAPI.describe();
		};
	}, []);
	return(<Routes>
		<Route element={<Outlet/>}>
			{!connected && <Route path={'*'} element={<ErrorPage/>}/>}
			{connected && <>
				<Route index element={<HomePage/>}/>
				<Route path={':roomId'} element={<RoomPage/>}/>
				<Route path={'*'} element={<Navigate to={'/spy'}/>}/>
			</>}
		</Route>
	</Routes>);
};

export default Router;