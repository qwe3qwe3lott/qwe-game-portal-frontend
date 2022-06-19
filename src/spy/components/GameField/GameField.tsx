import React, {useCallback, useEffect, useMemo} from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import CardsField from '../CardsField';

import styles from './GameField.module.scss';
import spyAPI from '../../api';
import {
	selectFieldCards,
	selectGameIsOnPause,
	selectGameIsRunning,
	selectIAmActing,
	selectSizes
} from '../../store/selectors';

type Props = {
	className?: string
}

const GameField: React.FC<Props> = ({className}) => {
	const fieldCards = useAppSelector(selectFieldCards);
	const sizes = useAppSelector(selectSizes);
	useEffect(() => {
		document.documentElement.style.setProperty('--rows', `${sizes.rows}00%`);
		document.documentElement.style.setProperty('--columns', `${sizes.columns}00%`);
	}, [sizes]);
	const layoutClass = useMemo(() => {
		return [styles.layout, className].join(' ');
	}, [className]);
	return(<div className={layoutClass}>
		<StatusBar/>
		{fieldCards.length !== 0 && <div className={styles.field}>
			<MoveButtons/>
			<span style={{ gridRow: 1, gridColumn: 1 }} className={styles.expander}/>
			<span style={{ gridRow: 2 + sizes.rows, gridColumn: 2 + sizes.columns }} className={styles.expander}/>
			<CardsField layoutStyle={{ gridRow: `2 / span ${sizes.rows}`, gridColumn: `2 / span ${sizes.columns}`}}/>
		</div>}
	</div>);
};

export default GameField;

const StatusBar: React.FC = () => {
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	const gameIsOnPause = useAppSelector(selectGameIsOnPause);
	return(<>
		{(!gameIsRunning || gameIsOnPause) && <div className={styles.statusBar}>
			<p className={styles.status}>{gameIsOnPause ? 'Ожидайте' : 'Ожидайте начала игры'}</p>
		</div>}
	</>);
};

let MoveButtons: React.FC = () => {
	const iAmActing = useAppSelector(selectIAmActing);
	const sizes = useAppSelector(selectSizes);
	const rowsArray = useMemo(() => Array.from({length: sizes.rows}, (_, i) => i + 1), [sizes]);
	const columnsArray = useMemo(() => Array.from({length: sizes.columns}, (_, i) => i + 1), [sizes]);
	const moveCards = useCallback((isRow: boolean, forward: boolean, id: number) => {
		spyAPI.moveCards({ id, forward, isRow });
	}, []);
	const getStyle = useCallback((column: number, row: number, rotate: number) => {
		return { gridColumn: `${column}`, gridRow: `${row}`, transform: `rotate(${rotate}deg)`};
	}, []);
	return(<>
		{iAmActing && <>
			{columnsArray.map(column => <button
				key={column}
				className={styles.button}
				style={getStyle(1+column, 1, 0)}
				onClick={() => moveCards(false, false, column)}>{column}</button>)}
			{rowsArray.map(row => <button
				key={row}
				className={styles.button}
				style={getStyle(2+columnsArray.length, 1+row, 90)}
				onClick={() => moveCards(true, true, row)}>{row}</button>)}
			{columnsArray.map(column => <button
				key={column}
				className={styles.button}
				style={getStyle(1+column, 2+rowsArray.length, 180)}
				onClick={() => moveCards(false, true, column)}>{column}</button>)}
			{rowsArray.map(row => <button
				key={row}
				className={styles.button}
				style={getStyle(1, 1+row, 270)}
				onClick={() => moveCards(true, false, row)}>{row}</button>)}
		</>}
	</>);
};
MoveButtons = React.memo(MoveButtons);
