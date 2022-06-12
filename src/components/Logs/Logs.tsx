import React from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';

import styles from './Logs.module.scss';

const Logs: React.FC = () => {
	const logs = useAppSelector(state => state.spy.logs);
	return(<ul className={styles.layout}>
		{logs.map(logRecord => <li key={logRecord.id} className={styles.record}>
			{logRecord.text}
		</li>)}
	</ul>);
};

export default Logs;