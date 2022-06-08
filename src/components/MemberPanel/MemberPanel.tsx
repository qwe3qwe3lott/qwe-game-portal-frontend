import React, {useCallback, useState} from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import spyAPI from '../../services/SpyAPI';
import NicknameForm from '../NicknameForm';

const MemberPanel: React.FC = () => {
	const iAmPlayer = useAppSelector(state => state.spy.iAmPlayer);
	const gameIsRunning = useAppSelector(state => state.spy.isRunning);
	const [showNicknameForm, setShowNicknameFormFlag] = useState(false);

	const becomeHandler = useCallback(() => {
		spyAPI.become(!iAmPlayer);
	}, [iAmPlayer]);

	const successHandler = useCallback(() => {
		setShowNicknameFormFlag(false);
	}, []);

	const openFormHandler = useCallback(() => {
		setShowNicknameFormFlag(true);
	}, []);

	return(<div>
		<button disabled={gameIsRunning} onClick={becomeHandler}>{iAmPlayer ? 'Стать зрителем' : 'Стать игроком'}</button>
		<button disabled={true}>Настройки</button>
		<button disabled={gameIsRunning || showNicknameForm} onClick={openFormHandler}>Изменить ник</button>
		{showNicknameForm && <NicknameForm onSuccess={successHandler}/>}
	</div>);
};

export default MemberPanel;