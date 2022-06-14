import React from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';

import styles from './Logs.module.scss';

const Logs: React.FC = () => {
	const logs = useAppSelector(state => state.spy.logs);
	return(<div className={styles.layout}>
		<p>Логи</p>
		<ol reversed className={styles.records}>
			{logs.map(logRecord => <li key={logRecord.id} className={styles.record}>
				{logRecord.text}
			</li>)}
		</ol>
	</div>);
};

export default Logs;