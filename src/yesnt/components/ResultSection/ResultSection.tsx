import React from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import {selectResult} from '../../store/selectors';
import ColumnPanel from '../../../components/ColumnPanel';
import styles from './ResultSection.module.scss';
import globalColors from '../../../colors.scss';
const ResultSection: React.FC = () => {
	const result = useAppSelector(selectResult);
	return result ? <ColumnPanel title={'Результаты последнего опроса'}>
		<p className={styles.question}>
			<span className={styles.bold}>Вопрос: </span>
			{result.question}
		</p>
		<div className={styles.bar} style={{ gridTemplateColumns: `${result.yesCount}fr ${result.noCount}fr ${result.silenceCount}fr` }}>
			<div style={{ backgroundColor: globalColors.secondaryColor }}/>
			<div style={{ backgroundColor: globalColors.secondaryOppositeColor }}/>
			<div style={{ backgroundColor: '#504E4EFF' }}/>
		</div>
		<p className={styles.info}>Да: {result.yesCount} / Нет: {result.noCount} / Воздержались: {result.silenceCount}</p>
	</ColumnPanel> : null;
};

export default ResultSection;