import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import spyAPI from '../../services/SpyAPI';

type Props = {
	className?: string
}

const RoomBar: React.FC<Props> = ({className}) => {
	const navigate = useNavigate();

	const exitHandler = useCallback(() => {
		spyAPI.leaveRoom();
		navigate('/');
	}, []);

	const copyHandler = useCallback(() => {
		navigator.clipboard.writeText(window.location.href);
	}, []);

	return(<div className={className}>
		<button onClick={copyHandler}>Скопировать ссылку</button>
		<button onClick={exitHandler}>Выйти</button>
	</div>);
};

export default RoomBar;