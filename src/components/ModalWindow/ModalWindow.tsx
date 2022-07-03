import React, {useCallback, useEffect} from 'react';

type Props = {
	title?: string
    children?: React.ReactNode
    closeHandler: () => void
}
import styles from './ModalWindow.module.scss';

const ModalWindow: React.FC<Props> = ({children, closeHandler, title}) => {
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, []);
	const stopCloseHandler = useCallback((event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation(), []);
	return(<div onMouseDown={closeHandler} className={styles.layout}>
		<div className={styles.window} onMouseDown={stopCloseHandler}>
			{title && <p className={styles.title}>{title}</p>}
			<div className={styles.content}>{children}</div>
		</div>
	</div>);
};

export default ModalWindow;