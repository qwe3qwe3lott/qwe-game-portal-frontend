import React, {useCallback, useMemo, useState} from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import spyAPI from '../../services/SpyAPI';
import NicknameForm from '../NicknameForm';
import styles from './MemberPanel.module.scss';
import ModalWindow from '../ModalWindow';

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
	const closeModalHandler = useCallback(() => {
		setShowNicknameFormFlag(false);
	}, []);
	const showModal = useMemo(() => {
		return showNicknameForm;
	}, [showNicknameForm]);

	return(<div className={styles.layout}>
		<button className={styles.button} disabled={gameIsRunning} onClick={becomeHandler}>{iAmPlayer ? 'Стать зрителем' : 'Стать игроком'}</button>
		<button className={styles.button} disabled={true}>Настройки</button>
		<button className={styles.button} disabled={gameIsRunning || showNicknameForm} onClick={openFormHandler}>Изменить ник</button>
		{showModal && <ModalWindow onClose={closeModalHandler}>
			{showNicknameForm && <NicknameForm onSuccess={successHandler}/>}
		</ModalWindow>}
	</div>);
};

export default MemberPanel;