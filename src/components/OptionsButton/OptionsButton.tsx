import React, {useCallback, useState} from 'react';
import ModalWindow from '../ModalWindow';
import {useAppSelector} from '../../hooks/typedReduxHooks';

import styles from './OptionsButton.module.scss';
import RoomOptionsForm from '../RoomOptionsForm';

type Props = {
	inGame: boolean
}

const OptionsButton: React.FC<Props> = ({ inGame }) => {
	const [showModal, setShowModal] = useState(false);
	const gameIsRunning = useAppSelector(state => state.spy.isRunning);
	const closeModalHandler = useCallback(() => {
		setShowModal(false);
	}, []);
	const openModalHandler = useCallback(() => {
		setShowModal(true);
	}, []);
	return(<>
		<button className={styles.button} disabled={gameIsRunning || showModal} onClick={openModalHandler}>Настройки</button>
		{showModal && <ModalWindow onClose={closeModalHandler}>
			<RoomOptionsForm onSuccess={closeModalHandler} inGame={inGame}/>
		</ModalWindow>}
	</>);
};

export default OptionsButton;