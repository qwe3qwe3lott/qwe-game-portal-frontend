import React, {ChangeEvent, useCallback, useState} from 'react';
import spyAPI from '../../api';

type Props = {
    onSuccess: () => void
}

import styles from './NicknameForm.module.scss';
import {useAppSelector} from '../../../hooks/typedReduxHooks';

const NicknameForm: React.FC<Props> = ({ onSuccess }) => {
	const nickname = useAppSelector(state => state.spy.nickname);
	const [value, setValue] = useState(nickname);

	const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	}, []);
	const sendHandler = useCallback(() => {
		spyAPI.changeNickname(value)
			.then(nickname => { if (nickname) onSuccess(); });
	}, [onSuccess, value]);

	return(<div className={styles.layout}>
		<input className={styles.input} onChange={changeHandler} value={value}/>
		<button className={styles.button} onClick={sendHandler}>Изменить</button>
	</div>);
};

export default NicknameForm;