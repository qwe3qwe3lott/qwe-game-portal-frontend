import React, {useCallback, useEffect} from 'react';

type Props = {
    children: React.ReactNode
    onClose: () => void
}
import styles from './ModalWindow.module.scss';

const ModalWindow: React.FC<Props> = ({children, onClose}) => {
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, []);
	const closeHandler = useCallback(() => {
	    onClose();
	}, []);
	return(<div onClick={closeHandler} className={styles.layout}>
		<div className={styles.window} onClick={(event) => event.stopPropagation()}>
			{children}
		</div>
	</div>);
};

export default ModalWindow;