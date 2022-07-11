import React, {ChangeEvent, useState} from 'react';

type Props = {
    onSuccess: () => void
	api: GameApi<GamePlayer, string, GameRoomOptions>
}

import styles from './NicknameForm.module.scss';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import {selectNickname} from '../../store';
import {GameApi} from '../../abstracts/GameApi';
import {GamePlayer} from '../../types/GamePlayer';
import {GameRoomOptions} from '../../types/GameRoomOptions';

const NicknameForm: React.FC<Props> = ({onSuccess, api}) => {
	const nickname = useAppSelector(selectNickname);
	const [value, setValue] = useState(nickname);
	const [delay, setDelay] = useState(false);
	const changeHandler = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);
	const sendHandler = async () => {
		setDelay(true);
		const nickname = await api.changeNickname(value);
		if (nickname) onSuccess();
		else setDelay(false);
	};

	return(<div className={styles.layout}>
		<input className={styles.input} onChange={changeHandler} placeholder={'Введите ник...'} value={value}/>
		<button className={styles.button} disabled={delay} onClick={sendHandler}>Изменить</button>
	</div>);
};

export default NicknameForm;