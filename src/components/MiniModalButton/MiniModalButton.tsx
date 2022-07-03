import React, {useCallback, useState} from 'react';
import styles from './MiniModalButton.module.scss';
import ModalWindow from '../ModalWindow';
import {GameApi} from '../../abstracts/GameApi';

type PropsOfForm = {
	onSuccess: () => void
	api: GameApi
}
type Props = {
	label?: string
    children?: React.ReactNode
	formSet?: { form: React.FC<PropsOfForm>, api: GameApi }
	icon?: string
	disabled?: boolean
}
const MiniModalButton: React.FC<Props> = ({ children, label, icon, formSet, disabled }) => {
	const [showModal, setShowModal] = useState(false);
	const closeModalHandler = useCallback(() => {
		setShowModal(false);
	}, []);
	const openModalHandler = useCallback(() => {
		setShowModal(true);
	}, []);
	const Form = formSet?.form;
	return(<>
		<button className={styles.miniButton} disabled={disabled || showModal} onClick={openModalHandler} style={{ backgroundImage: `url(${icon})` }}/>
		{showModal && <ModalWindow closeHandler={closeModalHandler} title={label}>
			{formSet && Form ? <Form onSuccess={closeModalHandler} api={formSet.api}/> : children}
		</ModalWindow>}
	</>);
};

export default MiniModalButton;