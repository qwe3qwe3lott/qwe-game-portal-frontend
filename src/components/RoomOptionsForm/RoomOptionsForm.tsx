import React, {FormEvent, useCallback, useEffect, useMemo} from 'react';
import spyAPI from '../../services/SpyAPI';

type Props = {
    onSuccess: () => void,
	inGame: boolean
}

import styles from './RoomOptionsForm.module.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import {setOptionSecondsToAct, setOptionWinScore} from '../../store/slices/spy';

const RoomOptionsForm: React.FC<Props> = ({ onSuccess, inGame }) => {
	const roomOptions = useAppSelector(state => state.spy.roomOptions);
	const dispatch = useAppDispatch();
	const ownerKey = useAppSelector(state => state.spy.ownerKey);

	useEffect(() => {
		if (!inGame) return;
		spyAPI.requestRoomOptions();
	}, []);
	const notAllowedToChange = useMemo(() => {
		return !ownerKey && inGame;
	}, [inGame, ownerKey]);
	const submitHandler = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		spyAPI.changeRoomOptions(ownerKey, roomOptions)
			.then(flag => { if (flag) onSuccess(); });
	}, [onSuccess, roomOptions, ownerKey]);
	return(<form className={styles.layout} onSubmit={submitHandler}>
		<label className={styles.topLabel}>
			Секунды на ход:
			<input
				type={'number'}
				disabled={notAllowedToChange}
				min={15}
				max={180}
				className={styles.input}
				onChange={(event) => dispatch(setOptionSecondsToAct(+event.target.value))}
				value={roomOptions.secondsToAct}/>
		</label>
		<label className={styles.topLabel}>
			Очки для победы:
			<input
				type={'number'}
				disabled={notAllowedToChange}
				min={1}
				max={5}
				className={styles.input}
				onChange={(event) => dispatch(setOptionWinScore(+event.target.value))}
				value={roomOptions.winScore}/>
		</label>
		{inGame && <button className={styles.button} disabled={notAllowedToChange}>Изменить</button>}
	</form>);
};

export default RoomOptionsForm;