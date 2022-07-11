import React from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import {selectAnswer, selectGameIsOnAnswering} from '../../store/selectors';
import {useApi} from '../../Api';
import {Answers} from '../../enums/Answers';

const AnsweringSection: React.FC = () => {
	const gameIsOnAnswering = useAppSelector(selectGameIsOnAnswering);
	return gameIsOnAnswering ? <Content/> : null;
};

export default AnsweringSection;

const Content: React.FC = () => {
	const api = useApi();
	const answer = useAppSelector(selectAnswer);
	return <div>
		<p>Ответ: {answer}</p>
		<button onClick={() => api.answer(Answers.YES)}>Да</button>
		<button onClick={() => api.answer(Answers.NO)}>Нет</button>
		<button onClick={() => api.answer(Answers.SILENCE)}>Воздержаться</button>
	</div>;
};