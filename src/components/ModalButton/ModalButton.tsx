import React, {useCallback, useState} from 'react';
import styles from './ModalButton.module.scss';
import ModalWindow from '../ModalWindow';

type PropsOfForm = {
	onSuccess: () => void
}
type Props = {
    label: string
    children?: React.ReactNode
	Form?: React.FC<PropsOfForm>
    inRoomBar?: boolean
}
const ModalButton: React.FC<Props> = ({ children, label, inRoomBar, Form }) => {
	const [showModal, setShowModal] = useState(false);
	const closeModalHandler = useCallback(() => {
		setShowModal(false);
	}, []);
	const openModalHandler = useCallback(() => {
		setShowModal(true);
	}, []);
	return(<>
		<button className={inRoomBar ? styles.roomBarButton : styles.button} disabled={showModal} onClick={openModalHandler}>{label}</button>
		{showModal && <ModalWindow closeHandler={closeModalHandler} title={label}>
			{Form ? <Form onSuccess={closeModalHandler}/> : children}
		</ModalWindow>}
	</>);
};

export default ModalButton;