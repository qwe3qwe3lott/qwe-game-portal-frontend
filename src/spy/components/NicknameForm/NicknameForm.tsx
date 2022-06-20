import React, {ChangeEvent, useCallback, useState} from 'react';

type Props = {
    onSuccess: () => void
}

import styles from './NicknameForm.module.scss';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import {selectNickname} from '../../../store';
import {useApi} from '../../api';

const NicknameForm: React.FC<Props> = ({ onSuccess }) => {
	const api = useApi();
	const nickname = useAppSelector(selectNickname);
	const [value, setValue] = useState(nickname);

	const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	}, []);
	const sendHandler = useCallback(() => {
		api.changeNickname(value)
			.then(nickname => { if (nickname) onSuccess(); });
	}, [onSuccess, value]);

	return(<div className={styles.layout}>
		<input className={styles.input} onChange={changeHandler} value={value}/>
		<button className={styles.button} onClick={sendHandler}>Изменить</button>
	</div>);
};

export default NicknameForm;