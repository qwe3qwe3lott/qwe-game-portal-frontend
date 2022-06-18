import React, {useCallback} from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import Card from '../Card';

import styles from './CardsField.module.scss';
import {selectFieldCards, selectSizes} from '../../store/selectors';

type Props = {
	layoutStyle: object
}

const CardsField: React.FC<Props> = ({ layoutStyle }) => {
	const cards = useAppSelector(selectFieldCards);
	const sizes = useAppSelector(selectSizes);
	const getStyle = useCallback((id: number) => {
		return { gridColumn: `${id % sizes.columns !== 0 ? id % sizes.columns : sizes.columns}`, gridRow: `${Math.ceil(id / sizes.columns)}`};
	}, [sizes]);
	return(<ul style={layoutStyle} className={styles.layout}>
		{cards.map((card, key) => <Card key={card.id} layoutStyle={getStyle(key+1)} card={card}/>)}
	</ul>);
};

export default React.memo(CardsField);