import React, {ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState} from 'react';
import spyAPI from '../../services/SpyAPI';

type Props = {
    onSuccess: () => void,
	inGame: boolean
}

import styles from './RoomOptionsForm.module.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import {
	setOptionColumns, setOptionMaxPlayers,
	setOptionMinPlayers,
	setOptionRows,
	setOptionSecondsToAct,
	setOptionWinScore
} from '../../store/slices/spy';
import {
	selectGameIsRunning, selectRoomMaxPlayers, selectRoomMinPlayers,
	selectRoomOptionColumns, selectRoomOptionRows,
	selectRoomOptions,
	selectRoomOptionSecondsToAct,
	selectRoomOptionWinScore
} from '../../store/selectors';

const RoomOptionsForm: React.FC<Props> = ({ onSuccess, inGame }) => {
	const [showCards, setShowCards] = useState(false);
	return(<SubmitForm onSuccess={onSuccess} inGame={inGame}>
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
		123
	</div>);
};

type InputProps = {
	min: number
	max: number
	type: React.HTMLInputTypeAttribute
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
	value: number
	label: string
}

const Input: React.FC<InputProps> = ({max, min, onChange, type, value, label}) => {
	return(<label className={styles.topLabel}>
		{label}
		<input
			type={type}
			min={min}
			max={max}
			className={styles.input}
			onChange={onChange}
			value={value}
		/>
	</label>);
};

const SecondsToActInput: React.FC = () => {
	const secondsToAct = useAppSelector(selectRoomOptionSecondsToAct);
	const dispatch = useAppDispatch();
	const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => dispatch(setOptionSecondsToAct(+event.target.value)), []);
	return(<Input min={spyAPI.MIN_SECONDS_TO_ACT} max={spyAPI.MAX_SECONDS_TO_ACT} type={'number'} onChange={changeHandler} value={secondsToAct} label={'Секунд на ход:'}/>);
};

const WinScoreInput: React.FC = () => {
	const winScore = useAppSelector(selectRoomOptionWinScore);
	const dispatch = useAppDispatch();
	const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => dispatch(setOptionWinScore(+event.target.value)), []);
	return(<Input min={spyAPI.MIN_WIN_SCORE} max={spyAPI.MAX_WIN_SCORE} type={'number'} onChange={changeHandler} value={winScore} label={'Очков для победы:'}/>);
};
const ColumnsInput: React.FC = () => {
	const winScore = useAppSelector(selectRoomOptionColumns);
	const dispatch = useAppDispatch();
	const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => dispatch(setOptionColumns(+event.target.value)), []);
	return(<Input min={spyAPI.MIN_COLUMNS} max={spyAPI.MAX_COLUMNS} type={'number'} onChange={changeHandler} value={winScore} label={'Колонок с картами:'}/>);
};
const RowsInput: React.FC = () => {
	const winScore = useAppSelector(selectRoomOptionRows);
	const dispatch = useAppDispatch();
	const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => dispatch(setOptionRows(+event.target.value)), []);
	return(<Input min={spyAPI.MIN_ROWS} max={spyAPI.MAX_ROWS} type={'number'} onChange={changeHandler} value={winScore} label={'Строк с картами:'}/>);
};
const MinPlayersInput: React.FC = () => {
	const winScore = useAppSelector(selectRoomMinPlayers);
	const dispatch = useAppDispatch();
	const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => dispatch(setOptionMinPlayers(+event.target.value)), []);
	return(<Input min={spyAPI.MIN_MIN_PLAYERS} max={spyAPI.MAX_MIN_PLAYERS} type={'number'} onChange={changeHandler} value={winScore} label={'Минимум игроков:'}/>);
};
const MaxPlayersInput: React.FC = () => {
	const winScore = useAppSelector(selectRoomMaxPlayers);
	const dispatch = useAppDispatch();
	const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => dispatch(setOptionMaxPlayers(+event.target.value)), []);
	return(<Input min={spyAPI.MIN_MAX_PLAYERS} max={spyAPI.MAX_MAX_PLAYERS} type={'number'} onChange={changeHandler} value={winScore} label={'Максимум игроков:'}/>);
};

type SubmitFormProps = {
	onSuccess: () => void
	children: React.ReactNode
	inGame: boolean
}
const SubmitForm: React.FC<SubmitFormProps> = ({onSuccess, children, inGame}) => {
	const roomOptions = useAppSelector(selectRoomOptions);
	const ownerKey = useAppSelector(state => state.spy.ownerKey);
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	useEffect(() => {
		if (!inGame) return;
		spyAPI.requestRoomOptions();
	}, []);
	const notAllowedToChange = useMemo(() => {
		return gameIsRunning || (!ownerKey && inGame);
	}, [inGame, ownerKey, gameIsRunning]);
	const submitHandler = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		spyAPI.changeRoomOptions(ownerKey, roomOptions)
			.then(flag => { if (flag) onSuccess(); });
	}, [onSuccess, roomOptions, ownerKey]);
	return(<form onSubmit={submitHandler}>
		<fieldset disabled={notAllowedToChange}>
			<div className={styles.layout}>
				{children}
				{inGame && <input type={'submit'} className={[styles.button, styles.stretchWidth].join(' ')}/>}
			</div>
		</fieldset>
	</form>);
};