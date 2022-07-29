import React from 'react';
import {PropsOfForm} from '../../types/PropsOfForm';
import GameRoomTitleForm from '../../components/GameRoomTitleForm';
import {selectOwnerKey, selectRoomTitle} from '../store/selectors';

const RoomTitleForm: React.FC<PropsOfForm> = ({api, onSuccess}) => {
	return <GameRoomTitleForm onSuccess={onSuccess} api={api} selectRoomTitle={selectRoomTitle} selectOwnerKey={selectOwnerKey}/>;
};

export default RoomTitleForm;