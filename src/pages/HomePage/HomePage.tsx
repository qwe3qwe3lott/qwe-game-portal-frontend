import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import spyAPI from '../../services/SpyAPI';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import OptionsButton from '../../components/OptionsButton';

const HomePage: React.FC = () => {
	const navigate = useNavigate();
	const roomOptions = useAppSelector(state => state.spy.roomOptions);

	const createHandler = useCallback(async () => {
		const roomId = await spyAPI.createRoom(roomOptions);
		if (roomId) navigate(`/${roomId}`);
	}, [roomOptions]);

	return (<div>
		<button onClick={createHandler}>Создать комнату</button>
		<OptionsButton inGame={false}/>
	</div>);
};

export default HomePage;