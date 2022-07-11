import React from 'react';
import {useSocketConnection} from '../../hooks/useSocketConnection';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import ErrorPage from '../../pages/ErrorPage';
import {routePath} from '../../spy/Router';
import {GameApi} from '../../abstracts/GameApi';
import {GamePlayer} from '../../types/GamePlayer';
import {GameRoomOptions} from '../../types/GameRoomOptions';

type Props = {
    api: GameApi<GamePlayer, string, GameRoomOptions>
    homePage: React.ReactNode,
    roomPage: React.ReactNode
}
const GameRouter: React.FC<Props> = ({ api, homePage, roomPage }) => {
	const connected = useSocketConnection(api);
	return(<Routes>
		<Route element={<Outlet/>}>
			{!connected && <Route path={'*'} element={<ErrorPage/>}/>}
			{connected && <>
				<Route index element={homePage}/>
				<Route path={':roomId'} element={roomPage}/>
				<Route path={'*'} element={<Navigate to={`/${routePath}`}/>}/>
			</>}
		</Route>
	</Routes>);
};

export default GameRouter;
