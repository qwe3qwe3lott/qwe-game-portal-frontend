import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import Room from '../../components/Room';
import {useApi} from '../../api';

type Params = {
    roomId: string
}

enum States {
	CHECKING,
	REDIRECT,
	JOINING,
	JOINED
}

const RoomPage: React.FC = () => {
	const api = useApi();
	const { roomId } = useParams<Params>();
	const [state, setState] = useState(States.CHECKING);

	useEffect(() => {
		api.checkRoom(roomId ?? '')
			.then(flag => { setState(flag ? States.JOINING : States.REDIRECT); });
	}, []);

	useEffect(() => {
		if (state === States.JOINING) api.joinRoom(roomId ?? '')
			.then(flag => { setState(flag ? States.JOINED : States.REDIRECT); });
	}, [state]);

	return (<>
		{state === States.REDIRECT && <Navigate to={'/spy'} replace/>}
		{state === States.JOINED && <Room/>}
	</>);
};

export default RoomPage;