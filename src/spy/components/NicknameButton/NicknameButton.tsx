import React, {useCallback, useState} from 'react';
import ModalWindow from '../ModalWindow';
import NicknameForm from '../NicknameForm';
import {useAppSelector} from '../../../hooks/typedReduxHooks';

import styles from './NicknameButton.module.scss';
import {selectGameIsRunning} from '../../store/selectors';

const NicknameButton: React.FC = () => {
	const [showModal, setShowModal] = useState(false);
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	const closeModalHandler = useCallback(() => {
		setShowModal(false);
	}, []);
	const openModalHandler = useCallback(() => {
		setShowModal(true);
	}, []);
	return(<>
		<button className={styles.button} disabled={gameIsRunning || showModal} onClick={openModalHandler}>Изменить ник</button>
		{showModal && <ModalWindow closeHandler={closeModalHandler}>
			<NicknameForm onSuccess={closeModalHandler}/>
		</ModalWindow>}
	</>);
};

export default NicknameButton;