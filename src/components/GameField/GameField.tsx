import React, {useCallback, useEffect, useMemo} from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import CardsField from '../CardsField';

import styles from './GameField.module.scss';
import spyAPI from '../../services/SpyAPI';

type Props = {
	className?: string
}

const GameField: React.FC<Props> = ({className}) => {
	const fieldCards = useAppSelector(state => state.spy.fieldCards);
	const sizes = useAppSelector(state => state.spy.sizes);
	const iAmActing = useAppSelector(state => state.spy.iAmActing);

	const rowsArray = useMemo(() => Array.from({length: sizes.rows}, (_, i) => i + 1), [sizes]);
	const columnsArray = useMemo(() => Array.from({length: sizes.columns}, (_, i) => i + 1), [sizes]);

	const getStyle = useCallback((column: number, row: number, rotate: number) => {
		return { gridColumn: `${column}`, gridRow: `${row}`, transform: `rotate(${rotate}deg)`};
	}, []);

	const moveCards = useCallback((isRow: boolean, forward: boolean, id: number) => {
		spyAPI.moveCards({ id, forward, isRow });
	}, []);
	useEffect(() => {
		document.documentElement.style.setProperty('--rows', `${sizes.rows}00%`);
		document.documentElement.style.setProperty('--columns', `${sizes.columns}00%`);
	}, [sizes]);
	const layoutClass = useMemo(() => {
		return [styles.layout, className].join(' ');
	}, [className]);
	return(<div className={layoutClass}>
		<div className={styles.field}>
			{fieldCards.length === 0 ? <p>Ожидайте начала игры</p> : <>
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
				<span style={{ gridRow: 1, gridColumn: 1 }} className={styles.expander}/>
				<span style={{ gridRow: 2 + rowsArray.length, gridColumn: 2 + columnsArray.length }} className={styles.expander}/>
				<CardsField layoutStyle={{ gridRow: `2 / span ${rowsArray.length}`, gridColumn: `2 / span ${columnsArray.length}`}}/>
			</>}
		</div>
	</div>);
};

export default GameField;