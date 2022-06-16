import React, {useMemo} from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';

import styles from './Logs.module.scss';

const Logs: React.FC = () => {
	const logs = useAppSelector(state => state.spy.logs);
	const gameIsRunning = useAppSelector(state => state.spy.isRunning);
	const recordClass = useMemo(() => {
		return [styles.record, gameIsRunning ? styles.recordInGame : ''].join(' ');
	}, [gameIsRunning]);
	return(<>
		{(logs.length > 0 || gameIsRunning) && <div className={styles.layout}>
			<p>Логи</p>
			<ol className={styles.records}>
				{logs.map(logRecord => <li key={logRecord.id} className={recordClass}>
				Шаг №{logRecord.id}. {logRecord.text}
				</li>)}
			</ol>
		</div>}
	</>);
};

export default Logs;