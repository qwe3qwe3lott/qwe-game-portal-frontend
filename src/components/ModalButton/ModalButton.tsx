import React, {useState} from 'react';
import styles from './ModalButton.module.scss';
import ModalWindow from '../ModalWindow';
import {GameApi} from '../../abstracts/GameApi';
import {GamePlayer} from '../../types/GamePlayer';
import {GameRoomOptions} from '../../types/GameRoomOptions';

type PropsOfForm = {
	onSuccess: () => void
	api: GameApi<GamePlayer, string, GameRoomOptions>
}
type Props = {
    label: string
    children?: React.ReactNode
	formSet?: { form: React.FC<PropsOfForm>, api: GameApi<GamePlayer, string, GameRoomOptions> }
    inRoomBar?: boolean
	disabled?: boolean
}
const ModalButton: React.FC<Props> = ({ children, label, inRoomBar, formSet, disabled }) => {
	const [showModal, setShowModal] = useState(false);
	const closeModalHandler = () => setShowModal(false);
	const openModalHandler = () => setShowModal(true);
	const Form = formSet?.form;
	return(<>
		<button className={inRoomBar ? styles.roomBarButton : styles.button} disabled={disabled || showModal} onClick={openModalHandler}>{label}</button>
		{showModal && <ModalWindow closeHandler={closeModalHandler} title={label}>
			{formSet && Form ? <Form onSuccess={closeModalHandler} api={formSet.api}/> : children}
		</ModalWindow>}
	</>);
};

export default ModalButton;