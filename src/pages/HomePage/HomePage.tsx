import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import spyAPI from '../../services/SpyAPI';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import OptionsButton from '../../components/OptionsButton';
import NicknameButton from '../../components/NicknameButton';
import {selectRoomOptions} from '../../store/selectors';

const HomePage: React.FC = () => {

	return (<div>
		<CreateRoomButton/>
		<OptionsButton inGame={false}/>
		<NicknameButton/>
	</div>);
};

export default HomePage;

const CreateRoomButton: React.FC = () => {
	const navigate = useNavigate();
	const roomOptions = useAppSelector(selectRoomOptions);
	const createHandler = useCallback(async () => {
		const roomId = await spyAPI.createRoom(roomOptions);
		if (roomId) navigate(`/${roomId}`);
	}, [roomOptions]);
	return(<button onClick={createHandler}>Создать комнату</button>);
};