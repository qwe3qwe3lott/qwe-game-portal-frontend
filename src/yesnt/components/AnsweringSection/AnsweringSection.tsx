import React from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import {selectAnswer, selectGameIsOnAnswering} from '../../store/selectors';
import {useApi} from '../../Api';
import {Answers} from '../../enums/Answers';
import styles from './AnsweringSection.module.scss';
import ColumnPanel from '../../../components/ColumnPanel';
import globalColors from '../../../colors.scss';
const AnsweringSection: React.FC = () => {
	const gameIsOnAnswering = useAppSelector(selectGameIsOnAnswering);
	return gameIsOnAnswering ? <Content/> : null;
};

export default AnsweringSection;

const Content: React.FC = () => {
	const api = useApi();
	const answer = useAppSelector(selectAnswer);
	return <ColumnPanel title={'Ваш ответ на вопрос:'}>
		<button
			className={styles.button}
			style={answer === Answers.YES ? { backgroundColor: globalColors.secondaryColor } : undefined}
			onClick={() => api.answer(Answers.YES)}
		>Да</button>
		<button
			className={styles.button}
			style={answer === Answers.NO ? { backgroundColor: globalColors.secondaryColor } : undefined}
			onClick={() => api.answer(Answers.NO)}
		>Нет</button>
		<button
			className={styles.button}
			style={answer === Answers.SILENCE ? { backgroundColor: globalColors.secondaryColor } : undefined}
			onClick={() => api.answer(Answers.SILENCE)}
		>Воздержаться</button>
	</ColumnPanel>;
};