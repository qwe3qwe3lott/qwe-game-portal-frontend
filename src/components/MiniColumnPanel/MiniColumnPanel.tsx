import React from 'react';
import styles from './MiniColumnPanel.module.scss';

type Props = {
    children: React.ReactNode;
};

const MiniColumnPanel: React.FC<Props> = ({ children }) => {
	return(<div className={styles.layout}>
		{children}
	</div>);
};

export default MiniColumnPanel;