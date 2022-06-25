import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './CreateRoomPanel.module.scss';
import NicknameButton from '../NicknameButton';
import RulesButton from '../RulesButton';
import {useApi} from '../../api';

const CreateRoomPanel: React.FC = () => {
	const navigate = useNavigate();
	const exitHandler = useCallback(() => {
		navigate('/');
	}, []);
	return (<div className={styles.layout}>
		<p className={styles.title}>{'Игра "Шпион"'}</p>
		<CreateRoomButton/>
		<RulesButton inGame={false}/>
		<NicknameButton/>
		<button className={styles.button} onClick={exitHandler}>К списку игр</button>
	</div>);
};

export default CreateRoomPanel;

const CreateRoomButton: React.FC = () => {
	const api = useApi();
	const navigate = useNavigate();
	const createHandler = useCallback(async () => {
		const roomId = await api.createRoom();
		if (roomId) navigate(`${roomId}`);
	}, []);
	return(<button className={styles.button} onClick={createHandler}>Создать комнату</button>);
};