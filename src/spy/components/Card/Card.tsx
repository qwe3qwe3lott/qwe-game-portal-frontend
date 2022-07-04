import React from 'react';
import {FieldCard} from '../../types/FieldCard';

import styles from './Card.module.scss';
import globalColors from '../../../colors.scss';
import {Directions} from '../../enums/Directions';

const getAnimationClass = (card: FieldCard): string => {
	if ('markMovedDirection' in card) {
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
	} else if ('markTeleportedDirection' in card) {
		switch (card.markTeleportedDirection) {
		case Directions.UP:
			return styles.teleportUp;
		case Directions.DOWN:
			return styles.teleportDown;
		case Directions.LEFT:
			return styles.teleportLeft;
		case Directions.RIGHT:
			return styles.teleportRight;
		default:
			return '';
		}
	} else return '';
};

type Props = {
	isDeco?: boolean
	card: FieldCard
	layoutStyle?: { gridColumn: string, gridRow: string }
	captureCard: (card: FieldCard) => void
	askCard: (card: FieldCard) => void
}
const RawCard: React.FC<Props> = ({ card, layoutStyle , isDeco, askCard, captureCard}) => {
	let backgroundColor = '';
	if (!isDeco) {
		if ('markCaptured' in card) backgroundColor = (card.markCaptured ? globalColors.secondaryColorHalfOppacity : globalColors.secondaryOppositeColorHalfOppacity) as string;
		else if ('markAsked' in card) backgroundColor = (card.markAsked ? globalColors.secondaryColorHalfOppacity : globalColors.secondaryOppositeColorHalfOppacity) as string;
		else if ('markMovedDirection' in card || 'markTeleportedDirection' in card) backgroundColor = (globalColors.secondaryColorHalfOppacity) as string;
	}
	const layoutClass = `${styles.layout} ${getAnimationClass(card)}`;
	const computedLayoutStyle = { ...layoutStyle, backgroundColor };
	return(<li className={layoutClass} style={computedLayoutStyle}>
		{!card.captured && <>
			<div className={styles.image} style={{ backgroundImage: `url(${card.url})` }}>
				{card.hasActOpportunity && !isDeco && <div className={styles.buttons}>
					<button className={styles.button} onClick={() => askCard(card)}>Д</button>
					<button className={styles.button} onClick={() => captureCard(card)}>П</button>
				</div>}
			</div>
			<p className={styles.title}>{card.title}</p>
		</>}
	</li>);
};

const Card = React.memo(RawCard, (before, after) => {
	if (before.layoutStyle && after.layoutStyle) {
		if (before.layoutStyle.gridColumn !== after.layoutStyle.gridColumn || before.layoutStyle.gridRow !== after.layoutStyle.gridRow) return false;
	}
	const beforeCard = before.card;
	const afterCard = after.card;
	if (afterCard.id !== beforeCard.id) return false;
	if (afterCard.title !== beforeCard.title) return false;
	if (afterCard.url !== beforeCard.url) return false;
	if (afterCard.captured !== beforeCard.captured) return false;
	if (afterCard.markAsked !== beforeCard.markAsked) return false;
	if (afterCard.markTeleportedDirection !== beforeCard.markTeleportedDirection) return false;
	if (afterCard.markCaptured !== beforeCard.markCaptured) return false;
	if (afterCard.markMovedDirection !== beforeCard.markMovedDirection) return false;
	if (afterCard.hasActOpportunity !== beforeCard.hasActOpportunity) return false;
	return true;
});

Card.displayName = 'Card';

export default Card;