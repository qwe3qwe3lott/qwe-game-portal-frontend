import React from 'react';
import {FieldCard} from '../../types/FieldCard';

import styles from './Card.module.scss';

type Props = {
	card: FieldCard
	layoutStyle: object
}

const Card: React.FC<Props> = ({ card, layoutStyle }) => {
	return(<div className={styles.layout} style={layoutStyle}>
		<div className={styles.image}>
			<button className={styles.button}>О</button>
			<button className={styles.button}>У</button>
		</div>
		<p className={styles.title}>{card.title}</p>
	</div>);
};

export default Card;