import {RootState} from '../../store';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import React from 'react';
import styles from './GameRoomOptionsNumberInput.module.scss';

type Props = {
	min: number
	max: number
	selector: (state: RootState) => number
	action: ActionCreatorWithPayload<number>
	label: string
}
const GameRoomOptionsNumberInput: React.FC<Props> = ({max, min, selector, action, label}) => {
	const value = useAppSelector(selector);
	const dispatch = useAppDispatch();
	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => dispatch(action(+event.target.value));
	return(<label className={styles.topLabel}>
		{label}
		<input
			type={'number'}
			min={min}
			max={max}
			className={styles.input}
			onChange={changeHandler}
			value={value}
		/>
	</label>);
};

export default GameRoomOptionsNumberInput;