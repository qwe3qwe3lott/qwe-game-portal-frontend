import React, {useEffect, useState} from 'react';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import RoomPage from '../../pages/RoomPage';
import HomePage from '../../pages/HomePage';
import ErrorPage from '../../pages/ErrorPage';
import spyAPI from '../../services/SpyAPI';

const App: React.FC = () => {
	const [connected, setConnected] = useState(false);
	useEffect(() => {
		const socket = spyAPI.socket;
		const handler = () => setConnected(socket.connected);
		socket.on('connect', handler);
		socket.on('disconnect', handler);
		return () => {
			socket.off('connect', handler);
			socket.off('disconnect', handler);
		};
	}, []);

	return (<Routes>
		{!connected && <Route path={'*'} element={<ErrorPage/>}/>}
		{connected && <Route path={'/'} element={<Outlet/>}>
			<Route index element={<HomePage/>}/>
			<Route path={':roomId'} element={<RoomPage/>}/>
			<Route path={'*'} element={<Navigate to={'/'} replace/>}/>
		</Route>}
	</Routes>);
};

export default App;
