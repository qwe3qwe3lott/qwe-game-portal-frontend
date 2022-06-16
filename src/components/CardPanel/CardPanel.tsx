import React from 'react';

import styles from './CardPanel.module.scss';
import Card from '../Card';
import {useAppSelector} from '../../hooks/typedReduxHooks';

const CardPanel: React.FC = () => {
	const card = useAppSelector(state => state.spy.card);
	return(<>
		{card && <div className={styles.layout}>
			<p>Ваша карта</p>
			<Card card={card} isDeco={true}/>
		</div>}
	</>);
};

export default CardPanel;