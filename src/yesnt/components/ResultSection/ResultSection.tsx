import React from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import {selectResult} from '../../store/selectors';

const ResultSection: React.FC = () => {
	const result = useAppSelector(selectResult);
	return result ? <div>
		<p>{result.question}</p>
		<p>Да: {result.yesCount}</p>
		<p>Нет: {result.noCount}</p>
		<p>Воздержались: {result.silenceCount}</p>
	</div> : null;
};

export default ResultSection;