import React from 'react';
import {useNavigate} from 'react-router-dom';
import spyAPI from '../../services/SpyAPI';

const HomePage: React.FC = () => {
	const navigate = useNavigate();

	const handler = async () => {
		const roomId = await spyAPI.createRoom();
		if (roomId) navigate(`/${roomId}`);
	};

	return (<div>
		<button onClick={handler}>create room</button>
	</div>);
};

export default HomePage;