import React from 'react';
import styles from './ColumnPanel.module.scss';

type Props = {
    title?: string;
    children: React.ReactNode;
    width?: number;
    hugeTitle?: boolean
};

const ColumnPanel: React.FC<Props> = ({ title, children, width, hugeTitle }) => {
	return(<div className={styles.layout} style={width ? { width: `${width}em` } : undefined}>
		{title && <p className={hugeTitle ? `${styles.title} ${styles.hugeTitle}` : styles.title}>{title}</p>}
		{children}
	</div>);
};

export default ColumnPanel;