import React, {ReactNode, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './GameCreateRoomPanel.module.scss';
import {GameApi} from '../../abstracts/GameApi';
import ColumnPanel from '../ColumnPanel';
import ModalButton from '../ModalButton';
import NicknameForm from '../NicknameForm';
import {GamePlayer} from '../../types/GamePlayer';
import {GameRoomOptions} from '../../types/GameRoomOptions';
type Props = {
	api: GameApi<GamePlayer, string, GameRoomOptions>
	gameTitle: string
	children?: ReactNode
}
const GameCreateRoomPanel: React.FC<Props> = ({api, gameTitle, children}) => {
	const navigate = useNavigate();
	const exitHandler = () => navigate('/');
	return (<ColumnPanel title={`Игра "${gameTitle}"`} hugeTitle width={15}>
		<CreateRoomButton api={api}/>
		<ModalButton label={'Изменить ник'} formSet={{ form: NicknameForm, api }}/>
		{children}
		<button className={styles.button} onClick={exitHandler}>К списку игр</button>
	</ColumnPanel>);
};

export default GameCreateRoomPanel;

type CreateRoomButtonProps = {
	api: GameApi<GamePlayer, string, GameRoomOptions>
}
const CreateRoomButton: React.FC<CreateRoomButtonProps> = ({api}) => {
	const navigate = useNavigate();
	const [delay, setDelay] = useState(false);
	const createHandler = async () => {
		setDelay(true);
		const roomId = await api.createRoom();
		if (roomId) navigate(`${roomId}`);
		else setDelay(false);
	};
	return(<button className={styles.button} disabled={delay} onClick={createHandler}>Создать комнату</button>);
};