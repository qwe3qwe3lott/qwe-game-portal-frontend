import React, {ChangeEvent, FormEvent, useCallback, useEffect, useMemo} from 'react';
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
	return(
		<SubmitForm onSuccess={onSuccess} inGame={inGame}>
			<ColumnsInput/>
			<RowsInput/>
			<SecondsToActInput/>
			<MinPlayersInput/>
			<MaxPlayersInput/>
			<WinScoreInput/>
		</SubmitForm>);
};

export default RoomOptionsForm;

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
	return(<Input min={15} max={180} type={'number'} onChange={changeHandler} value={secondsToAct} label={'Секунд на ход:'}/>);
};

const WinScoreInput: React.FC = () => {
	const winScore = useAppSelector(selectRoomOptionWinScore);
	const dispatch = useAppDispatch();
	const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => dispatch(setOptionWinScore(+event.target.value)), []);
	return(<Input min={1} max={5} type={'number'} onChange={changeHandler} value={winScore} label={'Очков для победы:'}/>);
};
const ColumnsInput: React.FC = () => {
	const winScore = useAppSelector(selectRoomOptionColumns);
	const dispatch = useAppDispatch();
	const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => dispatch(setOptionColumns(+event.target.value)), []);
	return(<Input min={3} max={7} type={'number'} onChange={changeHandler} value={winScore} label={'Колонок с картами:'}/>);
};
const RowsInput: React.FC = () => {
	const winScore = useAppSelector(selectRoomOptionRows);
	const dispatch = useAppDispatch();
	const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => dispatch(setOptionRows(+event.target.value)), []);
	return(<Input min={3} max={7} type={'number'} onChange={changeHandler} value={winScore} label={'Строк с картами:'}/>);
};
const MinPlayersInput: React.FC = () => {
	const winScore = useAppSelector(selectRoomMinPlayers);
	const dispatch = useAppDispatch();
	const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => dispatch(setOptionMinPlayers(+event.target.value)), []);
	return(<Input min={2} max={8} type={'number'} onChange={changeHandler} value={winScore} label={'Минимум игроков:'}/>);
};
const MaxPlayersInput: React.FC = () => {
	const winScore = useAppSelector(selectRoomMaxPlayers);
	const dispatch = useAppDispatch();
	const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => dispatch(setOptionMaxPlayers(+event.target.value)), []);
	return(<Input min={2} max={8} type={'number'} onChange={changeHandler} value={winScore} label={'Максимум игроков:'}/>);
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
		<fieldset disabled={notAllowedToChange} className={styles.layout}>
			{children}
			{inGame && <input type={'submit'} className={styles.button}/>}
		</fieldset>
	</form>);
};