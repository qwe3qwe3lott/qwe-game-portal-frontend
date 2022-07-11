import React, {useState} from 'react';
import {selectGameIsOnAsking, selectIAmActing, selectQuestion} from '../../store/selectors';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import {useApi} from '../../Api';

const AskingSection: React.FC = () => {
	const iAmActing = useAppSelector(selectIAmActing);
	const gameIsOnAsking = useAppSelector(selectGameIsOnAsking);
	if (!gameIsOnAsking) return <QuestionSection/>;
	if (iAmActing) return <AskingForm/>;
	return <div>
		<p>Ждите вопроса</p>
	</div>;
};

export default AskingSection;

const AskingForm: React.FC = () => {
	const api = useApi();
	const [value, setValue] = useState('');
	return <div>
		<input type={'text'} value={value} onChange={(event) => setValue(event.target.value)}/>
		<button onClick={() => api.ask(value)}>Спросить</button>
		<button onClick={() => api.skipAsk()}>Воздержаться</button>
	</div>;
};

const QuestionSection: React.FC = () => {
	const question = useAppSelector(selectQuestion);
	return <div>
		<p>Вопрос:</p>
		<p>{question}</p>
	</div>;
};