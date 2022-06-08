import React, {ChangeEvent, useCallback, useState} from 'react';
import spyAPI from '../../services/SpyAPI';

type Props = {
    onSuccess: () => void
}

const NicknameForm: React.FC<Props> = ({ onSuccess }) => {
	const [value, setValue] = useState('');

	const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	}, []);
	const sendHandler = useCallback(() => {
		spyAPI.changeNickname(value)
			.then(flag => { if (flag) onSuccess(); });
	}, [onSuccess, value]);

	return(<div>
		<input onChange={changeHandler} value={value}/>
		<button onClick={sendHandler}>Изменить</button>
	</div>);
};

export default NicknameForm;