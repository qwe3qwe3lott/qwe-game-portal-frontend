import React, {useCallback, useState} from 'react';
import ModalWindow from '../ModalWindow';
import NicknameForm from '../NicknameForm';
import {useAppSelector} from '../../hooks/typedReduxHooks';

import styles from './NicknameButton.module.scss';

const NicknameButton: React.FC = () => {
	const [showModal, setShowModal] = useState(false);
	const gameIsRunning = useAppSelector(state => state.spy.isRunning);
	const closeModalHandler = useCallback(() => {
		setShowModal(false);
	}, []);
	const openModalHandler = useCallback(() => {
		setShowModal(true);
	}, []);
	return(<>
		<button className={styles.button} disabled={gameIsRunning || showModal} onClick={openModalHandler}>Изменить ник</button>
		{showModal && <ModalWindow onClose={closeModalHandler}>
			<NicknameForm onSuccess={closeModalHandler}/>
		</ModalWindow>}
	</>);
};

export default NicknameButton;