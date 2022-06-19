import React, {useCallback, useState} from 'react';
import ModalWindow from '../ModalWindow';

import styles from './RulesButton.module.scss';

type Props = {
	inGame: boolean
}

const RulesButton: React.FC<Props> = ({ inGame }) => {
	const [showModal, setShowModal] = useState(false);
	const closeModalHandler = useCallback(() => {
		setShowModal(false);
	}, []);
	const openModalHandler = useCallback(() => {
		setShowModal(true);
	}, []);
	return(<>
		<button className={inGame ? styles.buttonInGame : styles.button} disabled={showModal} onClick={openModalHandler}>Правила</button>
		{showModal && <ModalWindow closeHandler={closeModalHandler}>
			Правила
		</ModalWindow>}
	</>);
};

export default RulesButton;