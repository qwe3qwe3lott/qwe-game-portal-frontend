import React, {useCallback, useMemo, useState} from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';

import styles from './Logs.module.scss';
import {computeLastLogs, selectGameIsRunning, selectLogs} from '../../store/selectors';

const Logs: React.FC = () => {
	const [showOnlyLastLogs, setShowOnlyLastLogs] = useState(true);
	const logs = useAppSelector(showOnlyLastLogs ? computeLastLogs : selectLogs);
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	const recordClass = useMemo(() => {
		return [styles.record, gameIsRunning ? styles.recordInGame : ''].join(' ');
	}, [gameIsRunning]);
	const changeHandler = useCallback(() => {
		setShowOnlyLastLogs(!showOnlyLastLogs);
	}, [showOnlyLastLogs]);
	return(<>
		{(logs.length > 0 || gameIsRunning) && <div className={styles.layout}>
			<p className={styles.title}>{gameIsRunning ? 'Логи:' : 'Логи предыдущего матча:'}</p>
			<label className={styles.checkLabel}>
				<input className={styles.checkBox} checked={showOnlyLastLogs} type={'checkbox'} onChange={changeHandler}/>
				несколько последних
			</label>
			<ul className={styles.records}>
				{logs.map(logRecord => <li key={logRecord.id} className={recordClass}>
					<span className={styles.step}>Шаг №{logRecord.id}.</span><br/>{logRecord.text}
				</li>)}
			</ul>
		</div>}
	</>);
};

export default Logs;