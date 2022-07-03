import React, {useCallback, useMemo, useState} from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';

import styles from './GameLogs.module.scss';
import {RootState} from '../../store';
import {LogRecord} from '../../types/LogRecord';
import ColumnPanel from '../ColumnPanel';

type Props = {
	selectGameIsRunning: (state: RootState) => boolean
	selectLogs: (state: RootState) => LogRecord[]
	computeLastLogs: (state: RootState) => LogRecord[]
}
const GameLogs: React.FC<Props> = ({selectGameIsRunning, selectLogs, computeLastLogs}) => {
	const [showOnlyLastLogs, setShowOnlyLastLogs] = useState(true);
	const logs = useAppSelector(showOnlyLastLogs ? computeLastLogs : selectLogs);
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	const recordClass = useMemo(() => {
		return [styles.record, gameIsRunning ? styles.recordInGame : ''].join(' ');
	}, [gameIsRunning]);
	const changeHandler = useCallback(() => {
		setShowOnlyLastLogs(!showOnlyLastLogs);
	}, [showOnlyLastLogs]);
	return logs.length > 0 || gameIsRunning ? <ColumnPanel title={gameIsRunning ? 'Логи:' : 'Логи предыдущего матча:'}>
		<label className={styles.checkLabel}>
			<input className={styles.checkBox} checked={showOnlyLastLogs} type={'checkbox'} onChange={changeHandler}/>
			несколько последних
		</label>
		<ul className={styles.records}>
			{logs.map(logRecord => <li key={logRecord.id} className={recordClass}>
				<span className={styles.step}>Шаг №{logRecord.id}.</span><br/>{logRecord.text}
			</li>)}
		</ul>
	</ColumnPanel> : null;
};

export default GameLogs;