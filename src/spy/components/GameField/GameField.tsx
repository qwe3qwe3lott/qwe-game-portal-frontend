import React, {useEffect} from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import CardsField from '../CardsField';
import styles from './GameField.module.scss';
import {
	selectFieldCards,
	selectGameIsOnPause,
	selectGameIsRunning,
	selectIAmActing,
	selectSizes
} from '../../store/selectors';
import {useApi} from '../../Api';
import GameRoomStatusBar from '../../../components/GameRoomStatusBar/GameRoomStatusBar';

type Props = {
	className?: string
}
const GameField: React.FC<Props> = ({className}) => {
	const layoutClass = `${styles.layout} ${className}`;
	return(<div className={layoutClass}>
		<GameRoomStatusBar selectGameIsRunning={selectGameIsRunning} selectGameIsOnPause={selectGameIsOnPause}/>
		<Content/>
	</div>);
};

export default GameField;

const Content: React.FC = () => {
	const fieldCards = useAppSelector(selectFieldCards);
	const sizes = useAppSelector(selectSizes);
	useEffect(() => {
		document.documentElement.style.setProperty('--rows', `${sizes.rows}00%`);
		document.documentElement.style.setProperty('--columns', `${sizes.columns}00%`);
	}, [sizes]);
	return <>
		{fieldCards.length !== 0 && <div className={styles.field}>
			<MoveButtons/>
			<span style={{ gridRow: 1, gridColumn: 1 }} className={styles.expander}/>
			<span style={{ gridRow: 2 + sizes.rows, gridColumn: 2 + sizes.columns }} className={styles.expander}/>
			<CardsField layoutStyle={{ gridRow: `2 / span ${sizes.rows}`, gridColumn: `2 / span ${sizes.columns}`}}/>
		</div>}
	</>;
};

let MoveButtons: React.FC = () => {
	const iAmActing = useAppSelector(selectIAmActing);
	const sizes = useAppSelector(selectSizes);
	if (!iAmActing) return null;

	const api = useApi();
	const rowsArray = Array.from({length: sizes.rows}, (_, i) => i + 1);
	const columnsArray = Array.from({length: sizes.columns}, (_, i) => i + 1);
	const moveCards = (isRow: boolean, forward: boolean, id: number) => api.moveCards({ id, forward, isRow });
	const getStyle = (column: number, row: number, rotate: number) => ({ gridColumn: `${column}`, gridRow: `${row}`, transform: `rotate(${rotate}deg)`});
	return <>
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
	</>;
};
MoveButtons = React.memo(MoveButtons);
