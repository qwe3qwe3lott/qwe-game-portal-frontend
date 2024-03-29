import React from 'react';
import GameRoomBar from '../../components/GameRoomBar';
import {gameTitle, routePath} from '../Router';
import ModalButton from '../../components/ModalButton';
import Rules from './Rules';
import {selectRoomTitle} from '../store/selectors';

type Props = {
	className?: string
}
const RoomBar: React.FC<Props> = ({className}) => {
	return <GameRoomBar className={className} routePath={routePath} gameTitle={gameTitle} selectRoomTitle={selectRoomTitle}>
		<ModalButton label={'Правила'} inRoomBar><Rules/></ModalButton>
	</GameRoomBar>;
};

export default RoomBar;