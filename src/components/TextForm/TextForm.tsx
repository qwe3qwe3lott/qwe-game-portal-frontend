import React, {ChangeEvent, FormEvent, useState} from 'react';
import styles from './TextForm.module.scss';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import {RootState} from '../../store';

type Props = {
	applyMethod: (value: string) => Promise<void>
	valueSelector: (state: RootState) => string
	placeholder?: string
	buttonLabel?: string
	maxLength?: number
	minLength?: number
}
const TextForm: React.FC<Props> = ({applyMethod, valueSelector, placeholder = '...', buttonLabel = 'Изменить', maxLength, minLength}) => {
	const storeValue = useAppSelector(valueSelector);
	const [value, setValue] = useState(storeValue);
	const [delay, setDelay] = useState(false);
	const changeHandler = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);
	const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setDelay(true);
		await applyMethod(value);
		setDelay(false);
	};
	return(<form className={styles.layout} onSubmit={submitHandler}>
		<input className={styles.input} onChange={changeHandler} placeholder={placeholder} value={value} maxLength={maxLength} minLength={minLength}/>
		<input className={styles.button} type={'submit'} disabled={delay} value={buttonLabel}/>
	</form>);
};

export default TextForm;