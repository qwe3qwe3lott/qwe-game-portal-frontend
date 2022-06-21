import React, {useCallback, useMemo} from 'react';
import {FieldCard} from '../../types/FieldCard';

import styles from './Card.module.scss';
import {Directions} from '../../enums/Directions';
import globalColors from '../../../colors.scss';
import {useApi} from '../../api';

type Props = {
	isDeco?: boolean
	card: FieldCard
	layoutStyle?: object
}

const Card: React.FC<Props> = ({ card, layoutStyle , isDeco}) => {
	const api = useApi();
	const captureHandler = useCallback(() => {
		api.captureCard(card.id);
	}, [card]);
	const askHandler = useCallback(() => {
		api.askCard(card.id);
	}, [card]);
	const backgroundColor = useMemo(() => {
		if (isDeco) return '';
		if ('markCaptured' in card) return (card.markCaptured ? globalColors.secondaryColorHalfOppacity : globalColors.secondaryOppositeColorHalfOppacity) as string;
		if ('markAsked' in card) return (card.markAsked ? globalColors.secondaryColorHalfOppacity : globalColors.secondaryOppositeColorHalfOppacity) as string;
		if ('markMovedDirection' in card || 'markTeleportedDirection' in card) return (globalColors.secondaryColorHalfOppacity) as string;
		return '';
	}, [card, isDeco]);
	const getAnimationClass = useCallback((card: FieldCard): string => {
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
	}, []);
	const layoutClass = useMemo(() => {
		return [styles.layout, getAnimationClass(card)].join(' ');
	}, [card]);
	const computedLayoutStyle = useMemo(() => {
		return {...layoutStyle, backgroundColor };
	}, [layoutStyle, backgroundColor]);
	return(<li className={layoutClass} style={computedLayoutStyle}>
		{!card.captured && <>
			<div className={styles.image} style={{ backgroundImage: `url(${card.url})` }}>
				{card.hasActOpportunity && !isDeco && <div className={styles.buttons}>
					<button className={styles.button} onClick={askHandler}>Д</button>
					<button className={styles.button} onClick={captureHandler}>П</button>
				</div>}
			</div>
			<p className={styles.title}>{card.title}</p>
		</>}
	</li>);
};

export default React.memo(Card);