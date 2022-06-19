import React from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';

import styles from './LastWinnerPanel.module.scss';
import {selectLastWinner} from '../../store/selectors';

const LastWinnerPanel: React.FC = () => {
	const lastWinner = useAppSelector(selectLastWinner);
	return(<>
		{lastWinner && <div className={styles.layout}>
			<p>Победитель:</p>
			<p>{lastWinner}</p>
		</div>}
	</>);
};

export default LastWinnerPanel;