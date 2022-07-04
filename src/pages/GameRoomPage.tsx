import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {GameApi} from '../abstracts/GameApi';
import {GamePlayer} from '../types/GamePlayer';
import {PayloadAction} from '@reduxjs/toolkit';
import {useAppDispatch} from '../hooks/typedReduxHooks';

type Params = {
    roomId: string
}
enum States {
	CHECKING,
	REDIRECT,
	JOINING,
	JOINED
}
type Props = {
	api: GameApi<GamePlayer>
	routePath: string
	Room: React.FC
	clearStoreAfterLeaving: () => PayloadAction
}
const GameRoomPage: React.FC<Props> = ({api, routePath, Room, clearStoreAfterLeaving}) => {
	const { roomId } = useParams<Params>();
	const [state, setState] = useState(States.CHECKING);
	const dispatch = useAppDispatch();
	useEffect(() => {
		api.checkRoom(roomId ?? '')
			.then(flag => { setState(flag ? States.JOINING : States.REDIRECT); });
		return () => { dispatch(clearStoreAfterLeaving()); };
	}, []);
	useEffect(() => {
		if (state === States.JOINING) api.joinRoom(roomId ?? '')
			.then(flag => { setState(flag ? States.JOINED : States.REDIRECT); });
	}, [state]);
	switch (state) {
	case States.REDIRECT:
		return <Navigate to={`/${routePath}`} replace/>;
	case States.JOINED:
		return <Room/>;
	default:
		return null;
	}
};

export default GameRoomPage;