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
		{connected && <Route path={'/'} element={<div>
			<button onClick={() => console.log(spyAPI.socket)}>check</button>
			<Outlet/>
		</div>}>
			<Route index element={<HomePage/>}/>
			<Route path={':roomId'} element={<RoomPage/>}/>
			<Route path={'*'} element={<Navigate to={'/'} replace/>}/>
		</Route>}
	</Routes>);
};

/*function App() {
	const { data: spectators } = spyAPI.useGetAllSpectatorsQuery();
	console.log(spectators);
	const { data: nickname } = spyAPI.useGetNicknameQuery();
	const [joinRoom, { data: ownerKey }] = spyAPI.useJoinRoomMutation();
	const [createRoom, { data: roomId }] = spyAPI.useCreateRoomMutation();
	return (<div>
		<button onClick={() => { createRoom(undefined); }}>create</button>
		<p>roomId {roomId}</p>
		<p>ownerKey {ownerKey}</p>
		<button onClick={() => {
			joinRoom({
				nickname: nickname ?? '',
				roomId: prompt() ?? ''
			});
		}}>join</button>
		<ul>
			{spectators && spectators.map((spectator, key) => <li key={key}>
				{spectator.nickname}
			</li>)}
		</ul>
	</div>);
}*/

export default App;
