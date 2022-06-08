import React, {useCallback} from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import Card from '../Card';

import styles from './CardsField.module.scss';

type Props = {
	layoutStyle: object
}

const CardsField: React.FC<Props> = ({ layoutStyle }) => {
	const cards = useAppSelector(state => state.spy.fieldCards);
	const sizes = useAppSelector(state => state.spy.sizes);

	const getStyle = useCallback((id: number) => {
		return { gridColumn: `${id % sizes.columns !== 0 ? id % sizes.columns : sizes.columns}`, gridRow: `${Math.ceil(id / sizes.columns)}`};
	}, [sizes]);

	return(<div style={layoutStyle} className={styles.layout}>
		{cards.map((card, key) => <Card key={card.id} layoutStyle={getStyle(key+1)} card={card}/>)}
	</div>);
};

export default React.memo(CardsField);