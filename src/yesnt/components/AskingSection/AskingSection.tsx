import React, {useState} from 'react';
import {selectGameIsOnAsking, selectIAmActing, selectQuestion} from '../../store/selectors';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import {useApi} from '../../Api';
import ColumnPanel from '../../../components/ColumnPanel';
import styles from './AskingSection.module.scss';
const AskingSection: React.FC = () => {
	const iAmActing = useAppSelector(selectIAmActing);
	const gameIsOnAsking = useAppSelector(selectGameIsOnAsking);
	if (!gameIsOnAsking) return <QuestionSection/>;
	if (iAmActing) return <AskingForm/>;
	return <ColumnPanel title={'Ожидайте вопроса'}/>;
};

export default AskingSection;

const AskingForm: React.FC = () => {
	const api = useApi();
	const [value, setValue] = useState('');
	const handler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		api.ask(value);
	};
	return <ColumnPanel title={'Задайте вопрос'} center>
		<form onSubmit={handler} className={styles.form}>
			<input placeholder={'Ваш вопрос...'} required maxLength={100} className={styles.input} type={'text'} value={value} onChange={(event) => setValue(event.target.value)}/>
			<input type={'submit'} value={'Спросить'} className={styles.askButton}/>
			<p className={styles.info}>{'Задайте вопрос, ответить на который можно "Да" или "Нет"'}</p>
			<button type={'button'} onClick={() => api.skipAsk()} className={styles.silenceButton}>Воздержаться</button>
		</form>
	</ColumnPanel>;
};

const QuestionSection: React.FC = () => {
	const question = useAppSelector(selectQuestion);
	return <ColumnPanel title={'Вопрос:'}>
		<p className={styles.question}>{question}</p>
	</ColumnPanel>;
};