import React from 'react';
import styles from './ColumnPanel.module.scss';

type Props = {
    title?: string;
    children: React.ReactNode;
    width?: number;
    hugeTitle?: boolean
    center?: boolean
};

const ColumnPanel: React.FC<Props> = ({ title, children, width, hugeTitle, center }) => {
	const style = { width: width ? `${width}em` : undefined, placeItems: center ? 'center' : undefined };
	return(<div className={styles.layout} style={style}>
		{title && <p className={hugeTitle ? `${styles.title} ${styles.hugeTitle}` : styles.title}>{title}</p>}
		{children}
	</div>);
};

export default ColumnPanel;