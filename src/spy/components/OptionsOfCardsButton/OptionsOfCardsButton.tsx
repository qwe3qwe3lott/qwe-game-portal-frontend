import React, {useCallback, useState} from 'react';
import styles from './OptionsOfCardsButton.module.scss';
import ModalWindow from '../ModalWindow';
import OptionsOfCardsForm from '../OptionsOfCardsForm';

const OptionsOfCardsButton: React.FC = () => {
	const [showModal, setShowModal] = useState(false);
	const closeModalHandler = useCallback(() => {
		setShowModal(false);
	}, []);
	const openModalHandler = useCallback(() => {
		setShowModal(true);
	}, []);
	return(<>
		<button className={styles.button} disabled={showModal} onClick={openModalHandler}>Настройки карт</button>
		{showModal && <ModalWindow closeHandler={closeModalHandler}>
			<OptionsOfCardsForm onSuccess={closeModalHandler}/>
		</ModalWindow>}
	</>);
};

export default OptionsOfCardsButton;
