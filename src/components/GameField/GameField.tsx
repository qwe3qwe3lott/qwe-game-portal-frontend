import React, {useCallback, useMemo} from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import CardsField from '../CardsField';

import styles from './GameField.module.scss';
import spyAPI from '../../services/SpyAPI';

type Props = {
	className?: string
}

const GameField: React.FC<Props> = ({className}) => {
	const isRunning = useAppSelector(state => state.spy.isRunning);
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

	return(<div className={[styles.layout, className].join(' ')}>
		<div className={styles.field}>
			{!isRunning ? <p>Ожидайте начала игры</p> : <>
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
				<span style={{ gridRow: 2 + rowsArray.length, gridColumn: 2 + columnsArray.length }}/>
				<CardsField layoutStyle={{ gridRow: `2 / span ${rowsArray.length}`, gridColumn: `2 / span ${columnsArray.length}`}}/>
			</>}
		</div>
	</div>);
};

export default GameField;