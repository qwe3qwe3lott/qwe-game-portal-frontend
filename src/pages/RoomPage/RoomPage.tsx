import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import Room from '../../components/Room';
import spyAPI from '../../services/SpyAPI';

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
	const { roomId } = useParams<Params>();
	const [state, setState] = useState(States.CHECKING);

	useEffect(() => {
		spyAPI.checkRoom(roomId ?? '')
			.then(flag => { setState(flag ? States.JOINING : States.REDIRECT); });
	}, []);

	useEffect(() => {
		if (state === States.JOINING) spyAPI.joinRoom(roomId ?? '')
			.then(flag => { setState(flag ? States.JOINED : States.REDIRECT); });
	}, [state]);

	return (<>
		{state === States.CHECKING && <p>checking {roomId}</p>}
		{state === States.REDIRECT && <Navigate to={'/'} replace/>}
		{state === States.JOINING && <p>joining {roomId}</p>}
		{state === States.JOINED && <Room/>}
	</>);
};

export default RoomPage;