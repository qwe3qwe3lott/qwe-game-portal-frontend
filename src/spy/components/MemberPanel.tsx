import React from 'react';
import GameMemberPanel from '../../components/GameMemberPanel';
import {useApi} from '../Api';
import {selectGameIsRunning, selectIAmPlayer} from '../store/selectors';
import ModalButton from '../../components/ModalButton';
import RoomOptionsForm from './RoomOptionsForm';
import OptionsOfCardsForm from './OptionsOfCardsForm';

const MemberPanel: React.FC = () => {
	const api = useApi();
	return(<GameMemberPanel api={api} selectIAmPlayer={selectIAmPlayer} selectGameIsRunning={selectGameIsRunning}>
		<ModalButton label={'Настройки'} formSet={{ form: RoomOptionsForm, api }}/>
		<ModalButton label={'Карты'} formSet={{ form: OptionsOfCardsForm, api }}/>
	</GameMemberPanel>);
};

export default MemberPanel;
