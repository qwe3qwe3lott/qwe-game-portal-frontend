import React from 'react';

import styles from './CardPanel.module.scss';
import Card from '../Card';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import {selectCard} from '../../store/selectors';

const CardPanel: React.FC = () => {
	const card = useAppSelector(selectCard);
	return(<>
		{card && <div className={styles.layout}>
			<p>Ваша карта:</p>
			<Card card={card} isDeco={true}/>
		</div>}
	</>);
};

export default CardPanel;