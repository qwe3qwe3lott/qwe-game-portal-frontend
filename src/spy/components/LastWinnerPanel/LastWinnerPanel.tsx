import React from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';

import styles from './LastWinnerPanel.module.scss';

const LastWinnerPanel: React.FC = () => {
	const lastWinner = useAppSelector(state => state.spy.lastWinner);
	return(<>
		{lastWinner && <div className={styles.layout}>
			<p>Победитель:</p>
			<p>{lastWinner}</p>
		</div>}
	</>);
};

export default LastWinnerPanel;