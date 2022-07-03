import React, {useCallback} from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import Card from '../Card';

import styles from './CardsField.module.scss';
import {computeYourCardIndex, selectFieldCards, selectSizes} from '../../store/selectors';
import {FieldCard} from '../../types/FieldCard';
import {Directions} from '../../enums/Directions';
import {useApi} from '../../Api';

type Props = {
	layoutStyle: object
}

const CardsField: React.FC<Props> = ({ layoutStyle }) => {
	const api = useApi();
	const cards = useAppSelector(selectFieldCards);
	const sizes = useAppSelector(selectSizes);
	const getStyle = useCallback((id: number) => {
		return { gridColumn: `${id % sizes.columns !== 0 ? id % sizes.columns : sizes.columns}`, gridRow: `${Math.ceil(id / sizes.columns)}`};
	}, [sizes]);
	const captureHandler = useCallback((card: FieldCard) => {
		api.captureCard(card.id);
	}, []);
	const askHandler = useCallback((card: FieldCard) => {
		api.askCard(card.id);
	}, []);
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
	return(<ul style={layoutStyle} className={styles.layout}>
		{cards.map((card, key) => <Card
			key={card.id}
			layoutStyle={getStyle(key+1)}
			card={card}
			captureCard={captureHandler}
			askCard={askHandler}
			getAnimationClass={getAnimationClass}
		/>)}
		<YourCard key={0}/>
	</ul>);
};

export default React.memo(CardsField);

const YourCard: React.FC = () => {
	const sizes = useAppSelector(selectSizes);
	const cardIndex = useAppSelector(computeYourCardIndex);
	const getStyle = useCallback((id: number) => {
		return { gridColumn: `${id % sizes.columns !== 0 ? id % sizes.columns : sizes.columns}`, gridRow: `${Math.ceil(id / sizes.columns)}`};
	}, [sizes]);
	return(<>
		{cardIndex !== -1 && <div key={cardIndex} className={styles.yourCard} style={getStyle(cardIndex+1)}/>}
	</>);
};