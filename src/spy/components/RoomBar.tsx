import React from 'react';
import GameRoomBar from '../../components/GameRoomBar';
import {routePath} from '../Router';
import ModalButton from '../../components/ModalButton';
import Rules from './Rules';

type Props = {
	className?: string
}
const RoomBar: React.FC<Props> = ({className}) => {
	return <GameRoomBar className={className} routePath={routePath}>
		<ModalButton label={'Правила'} inRoomBar><Rules/></ModalButton>
	</GameRoomBar>;
};

export default RoomBar;