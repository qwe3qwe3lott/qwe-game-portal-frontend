import {GameApi} from '../abstracts/GameApi';
import {useEffect, useState} from 'react';

export const useSocketConnection = (api: GameApi) => {
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