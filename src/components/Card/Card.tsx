import React from 'react';
import {FieldCard} from '../../types/FieldCard';

import styles from './Card.module.scss';
import {useAppSelector} from '../../hooks/typedReduxHooks';

type Props = {
	card: FieldCard
	layoutStyle: object
}

const Card: React.FC<Props> = ({ card, layoutStyle }) => {
	const iAmActing = useAppSelector(state => state.spy.iAmActing);

	return(<div className={styles.layout} style={{...layoutStyle, backgroundColor: card.color }}>
		<div className={styles.image}>
			{iAmActing && <>
				<button className={styles.button}>Д</button>
				<button className={styles.button}>П</button>
			</>}
		</div>
		<p className={styles.title}>{card.title}</p>
	</div>);
};

export default Card;