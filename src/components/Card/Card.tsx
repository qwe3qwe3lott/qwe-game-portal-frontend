import React, {useCallback, useMemo} from 'react';
import {FieldCard} from '../../types/FieldCard';

import styles from './Card.module.scss';
import spyAPI from '../../services/SpyAPI';
import {Directions} from '../../enums/Directions';

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

	const backgroundColor = useMemo(() => {
		if ('markCaptured' in card) return card.markCaptured ? '#007f00' : '#7f0000';
		if ('markAsked' in card) return card.markAsked ? '#007f00' : '#7f0000';
		if ('markMovedDirection' in card) return '#007f00';
	}, [card]);
	const getAnimationClass = useCallback((card: FieldCard): string => {
		if (!('markMovedDirection' in card)) return '';
		switch (card.markMovedDirection) {
		case Directions.UP:
			return styles.moveUp;
		case Directions.DOWN:
			return styles.moveDown;
		case Directions.LEFT:
			return styles.moveLeft;
		case Directions.RIGHT:
			return styles.moveRight;
		default:
			return '';
		}
	}, []);
	return(<div className={[styles.layout, getAnimationClass(card)].join(' ')} style={{...layoutStyle, backgroundColor }}>
		{!card.captured && <>
			<div className={styles.image} style={{ backgroundImage: `url(${card.url})` }}>
				{card.hasActOpportunity && !isDeco && <div className={styles.buttons}>
					<button className={styles.button} onClick={askHandler}>Д</button>
					<button className={styles.button} onClick={captureHandler}>П</button>
				</div>}
			</div>
			<p className={styles.title}>{card.title}</p>
		</>}
	</div>);
};

export default Card;