import React, {useCallback, useState} from 'react';
import ModalWindow from '../ModalWindow';

import styles from './RoomOptionsButton.module.scss';
import RoomOptionsForm from '../RoomOptionsForm';

const RoomOptionsButton: React.FC = () => {
	const [showModal, setShowModal] = useState(false);
	const closeModalHandler = useCallback(() => {
		setShowModal(false);
	}, []);
	const openModalHandler = useCallback(() => {
		setShowModal(true);
	}, []);
	return(<>
		<button className={styles.button} disabled={showModal} onClick={openModalHandler}>Настройки</button>
		{showModal && <ModalWindow closeHandler={closeModalHandler}>
			<RoomOptionsForm onSuccess={closeModalHandler}/>
		</ModalWindow>}
	</>);
};

export default RoomOptionsButton;