import React, {useCallback} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import spyAPI from '../../services/SpyAPI';

type Params = {
    roomId: string,
}

type Props = {
	className?: string
}

const RoomBar: React.FC<Props> = ({className}) => {
	const { roomId } = useParams<Params>();
	const navigate = useNavigate();

	const handler = useCallback(() => {
		spyAPI.leaveRoom();
		navigate('/');
	}, []);

	return(<div className={className}>
		<p>room {roomId}</p>
		<button onClick={handler}>Выйти</button>
	</div>);
};

export default RoomBar;