import {GameApi} from '../abstracts/GameApi';
import {useEffect, useState} from 'react';
import {GamePlayer} from '../types/GamePlayer';
import {GameRoomStatus} from '../types/GameRoomStatus';
import {GameRoomOptions} from '../types/GameRoomOptions';

export const useSocketConnection = (api: GameApi<GamePlayer, GameRoomStatus, GameRoomOptions>) => {
	const [connected, setConnected] = useState(false);
	useEffect(() => {
		api.subscribe();
		const socket = api.socket;
		if (!socket) return;
		const handler = () => { setConnected(socket.connected); };
		socket.on('connect', handler);
		socket.on('disconnect', handler);
		return () => {
			socket.off('connect', handler);
			socket.off('disconnect', handler);
			api.describe();
		};
	}, []);
	return connected;
};