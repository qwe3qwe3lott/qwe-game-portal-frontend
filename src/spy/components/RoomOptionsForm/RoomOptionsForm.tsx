import React, {ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState} from 'react';

type Props = {
    onSuccess: () => void,
}

import styles from './RoomOptionsForm.module.scss';
import {useAppDispatch, useAppSelector} from '../../../hooks/typedReduxHooks';
import {
	setOptionColumns, setOptionMaxPlayers,
	setOptionMinPlayers,
	setOptionRows,
	setOptionSecondsToAct,
	setOptionWinScore
} from '../../store';
import {
	selectGameIsRunning, selectOwnerKey, selectRoomMaxPlayers, selectRoomMinPlayers,
	selectRoomOptionColumns, selectRoomOptionRows,
	selectRoomOptions,
	selectRoomOptionSecondsToAct,
	selectRoomOptionWinScore
} from '../../store/selectors';
import {RootState} from '../../../store';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {Api, useApi} from '../../api';

const RoomOptionsForm: React.FC<Props> = ({ onSuccess }) => {
	const [showCards, setShowCards] = useState(false);
	return(<SubmitForm onSuccess={onSuccess}>
		<p
			className={[styles.button, styles.fakeButton, styles.stretchWidth].join(' ')}
			role={'button'}
			onClick={() => setShowCards(!showCards)}
		>{!showCards ? 'Настройка карт' : 'Настройка правил'}</p>
		{!showCards ? <>
			<ColumnsInput/>
			<RowsInput/>
			<SecondsToActInput/>
			<MinPlayersInput/>
			<MaxPlayersInput/>
			<WinScoreInput/>
		</> : <OptionsOfCards/>}
	</SubmitForm>);
};

export default RoomOptionsForm;

const OptionsOfCards: React.FC = () => {
	return(<div className={styles.stretchWidth}>
		в разработке
	</div>);
};

type InputProps = {
	min: number
	max: number
	type: React.HTMLInputTypeAttribute
	selector: (state: RootState) => number
	action: ActionCreatorWithPayload<number>
	label: string
}

const Input: React.FC<InputProps> = ({max, min, selector, action, type, label}) => {
	const value = useAppSelector(selector);
	const dispatch = useAppDispatch();
	const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => dispatch(action(+event.target.value)), []);
	return(<label className={styles.topLabel}>
		{label}
		<input
			type={type}
			min={min}
			max={max}
			className={styles.input}
			onChange={changeHandler}
			value={value}
		/>
	</label>);
};
const SecondsToActInput: React.FC = () =>
	<Input min={Api.MIN_SECONDS_TO_ACT} max={Api.MAX_SECONDS_TO_ACT} type={'number'} selector={selectRoomOptionSecondsToAct}
		action={setOptionSecondsToAct} label={'Секунд на ход:'}/>;
const WinScoreInput: React.FC = () =>
	<Input min={Api.MIN_WIN_SCORE} max={Api.MAX_WIN_SCORE} type={'number'} selector={selectRoomOptionWinScore} action={setOptionWinScore} label={'Очков для победы:'}/>;
const ColumnsInput: React.FC = () =>
	<Input min={Api.MIN_COLUMNS} max={Api.MAX_COLUMNS} type={'number'} selector={selectRoomOptionColumns} action={setOptionColumns} label={'Колонок с картами:'}/>;
const RowsInput: React.FC = () =>
	<Input min={Api.MIN_ROWS} max={Api.MAX_ROWS} type={'number'} selector={selectRoomOptionRows} action={setOptionRows} label={'Строк с картами:'}/>;
const MinPlayersInput: React.FC = () =>
	<Input min={Api.MIN_MIN_PLAYERS} max={Api.MAX_MIN_PLAYERS} type={'number'} selector={selectRoomMinPlayers} action={setOptionMinPlayers} label={'Минимум игроков:'}/>;
const MaxPlayersInput: React.FC = () =>
	<Input min={Api.MIN_MAX_PLAYERS} max={Api.MAX_MAX_PLAYERS} type={'number'} selector={selectRoomMaxPlayers} action={setOptionMaxPlayers} label={'Максимум игроков:'}/>;
type SubmitFormProps = {
	onSuccess: () => void
	children: React.ReactNode
}
const SubmitForm: React.FC<SubmitFormProps> = ({onSuccess, children}) => {
	const api = useApi();
	const roomOptions = useAppSelector(selectRoomOptions);
	const ownerKey = useAppSelector(selectOwnerKey);
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	useEffect(() => {
		api.requestRoomOptions();
	}, []);
	const notAllowedToChange = useMemo(() => {
		return gameIsRunning || !ownerKey;
	}, [ownerKey, gameIsRunning]);
	const submitHandler = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		api.changeRoomOptions(ownerKey, roomOptions)
			.then(flag => { if (flag) onSuccess(); });
	}, [onSuccess, roomOptions, ownerKey]);
	return(<form onSubmit={submitHandler}>
		<fieldset disabled={notAllowedToChange}>
			<div className={styles.layout}>
				{children}
				<input type={'submit'} className={[styles.button, styles.stretchWidth].join(' ')}/>
			</div>
		</fieldset>
	</form>);
};