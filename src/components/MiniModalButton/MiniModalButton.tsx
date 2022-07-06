import React, {useState} from 'react';
import styles from './MiniModalButton.module.scss';
import ModalWindow from '../ModalWindow';
import {GameApi} from '../../abstracts/GameApi';
import {GamePlayer} from '../../types/GamePlayer';
import {GameRoomStatus} from '../../types/GameRoomStatus';
import {GameRoomOptions} from '../../types/GameRoomOptions';

type PropsOfForm = {
	onSuccess: () => void
	api: GameApi<GamePlayer, GameRoomStatus, GameRoomOptions>
}
type Props = {
	label?: string
    children?: React.ReactNode
	formSet?: { form: React.FC<PropsOfForm>, api: GameApi<GamePlayer, GameRoomStatus, GameRoomOptions> }
	icon?: string
	disabled?: boolean
}
const MiniModalButton: React.FC<Props> = ({ children, label, icon, formSet, disabled }) => {
	const [showModal, setShowModal] = useState(false);
	const closeModalHandler = () => setShowModal(false);
	const openModalHandler = () => setShowModal(true);
	const Form = formSet?.form;
	return(<>
		<button className={styles.miniButton} disabled={disabled || showModal} onClick={openModalHandler} style={{ backgroundImage: `url(${icon})` }}/>
		{showModal && <ModalWindow closeHandler={closeModalHandler} title={label}>
			{formSet && Form ? <Form onSuccess={closeModalHandler} api={formSet.api}/> : children}
		</ModalWindow>}
	</>);
};

export default MiniModalButton;