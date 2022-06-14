import React, {useCallback, useMemo} from 'react';
import {FieldCard} from '../../types/FieldCard';

import styles from './Card.module.scss';
import spyAPI from '../../services/SpyAPI';
import {rgbToHex} from '../../util/rgbToHex';

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
		if ('markAsked' in card) return '#ff7f00';
		if (card.markMovedPercent) {
			const rb = Math.round(255 - (card.markMovedPercent * 128));
			return rgbToHex(rb,255, rb);
		}
	}, [card]);

	return(<div className={styles.layout} style={{...layoutStyle, backgroundColor }}>
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