import React, {useCallback} from 'react';
import {FieldCard} from '../../types/FieldCard';

import styles from './Card.module.scss';
import spyAPI from '../../services/SpyAPI';

type Props = {
	isDeco?: boolean
	card: FieldCard
	layoutStyle?: object
}

const Card: React.FC<Props> = ({ card, layoutStyle , isDeco}) => {
	const captureHandler = useCallback(() => {
		spyAPI.captureCard(card.id);
	}, [card]);

	const askHandler = useCallback(() => {
		spyAPI.askCard(card.id);
	}, [card]);

	return(<div className={styles.layout} style={{...layoutStyle, backgroundColor: card.color }}>
		{!card.captured && <>
			<div className={styles.image}>
				{card.hasActOpportunity && !isDeco && <>
					<button className={styles.button} onClick={askHandler}>Д</button>
					<button className={styles.button} onClick={captureHandler}>П</button>
				</>}
			</div>
			<p className={styles.title}>{card.title}</p>
		</>}
	</div>);
};

export default Card;