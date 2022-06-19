import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './CreateRoomPanel.module.scss';
import OptionsButton from '../OptionsButton';
import NicknameButton from '../NicknameButton';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import {selectRoomOptions} from '../../store/selectors';
import api from '../../api';
import RulesButton from '../RulesButton';

const CreateRoomPanel: React.FC = () => {
	const navigate = useNavigate();
	const exitHandler = useCallback(() => {
		navigate('/');
	}, []);
	return (<div className={styles.layout}>
		<p className={styles.title}>{'Игра "Шпион"'}</p>
		<CreateRoomButton/>
		<OptionsButton inGame={false}/>
		<RulesButton inGame={false}/>
		<NicknameButton/>
		<button className={styles.button} onClick={exitHandler}>К списку игр</button>
	</div>);
};

export default CreateRoomPanel;

const CreateRoomButton: React.FC = () => {
	const navigate = useNavigate();
	const roomOptions = useAppSelector(selectRoomOptions);
	const createHandler = useCallback(async () => {
		const roomId = await api.createRoom(roomOptions);
		if (roomId) navigate(`${roomId}`);
	}, [roomOptions]);
	return(<button className={styles.button} onClick={createHandler}>Создать комнату</button>);
};