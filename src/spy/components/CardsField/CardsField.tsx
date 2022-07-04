import React, {useCallback} from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import Card from '../Card';
import styles from './CardsField.module.scss';
import {computeYourCardIndex, selectFieldCards, selectSizes} from '../../store/selectors';
import {FieldCard} from '../../types/FieldCard';
import {useApi} from '../../Api';

type Props = {
	layoutStyle: object
}
const CardsField: React.FC<Props> = ({ layoutStyle }) => {
	const api = useApi();
	const cards = useAppSelector(selectFieldCards);
	const sizes = useAppSelector(selectSizes);
	const getStyle = (id: number) => ({ gridColumn: `${id % sizes.columns !== 0 ? id % sizes.columns : sizes.columns}`, gridRow: `${Math.ceil(id / sizes.columns)}`});
	const captureHandler = useCallback((card: FieldCard) => api.captureCard(card.id), []);
	const askHandler = useCallback((card: FieldCard) => api.askCard(card.id), []);
	return(<ul style={layoutStyle} className={styles.layout}>
		{cards.map((card, key) => <Card
			key={card.id}
			layoutStyle={getStyle(key+1)}
			card={card}
			captureCard={captureHandler}
			askCard={askHandler}
		/>)}
		<YourCard key={0} getStyle={getStyle}/>
	</ul>);
};

export default React.memo(CardsField);

type YourCardProps = {
	getStyle: (id: number) => { gridRow: string, gridColumn: string }
}
const YourCard: React.FC<YourCardProps> = ({getStyle}) => {
	const cardIndex = useAppSelector(computeYourCardIndex);
	return cardIndex !== -1 ? <div key={cardIndex} className={styles.yourCard} style={getStyle(cardIndex+1)}/> : null;
};