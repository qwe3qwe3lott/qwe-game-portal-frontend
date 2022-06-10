import React, {useCallback} from 'react';
import {FieldCard} from '../../types/FieldCard';

import styles from './Card.module.scss';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import spyAPI from '../../services/SpyAPI';

type Props = {
	isDeco?: boolean
	card: FieldCard
	layoutStyle?: object
}

const Card: React.FC<Props> = ({ card, layoutStyle , isDeco}) => {
	const iAmActing = useAppSelector(state => state.spy.iAmActing);

	const captureHandler = useCallback(() => {
		spyAPI.captureCard(card.id);
	}, [card]);

	return(<div className={styles.layout} style={{...layoutStyle, backgroundColor: card.color }}>
		{!card.captured && <>
			<div className={styles.image}>
				{iAmActing && !isDeco && <>
					<button className={styles.button}>Д</button>
					<button className={styles.button} onClick={captureHandler}>П</button>
				</>}
			</div>
			<p className={styles.title}>{card.title}</p>
		</>}
	</div>);
};

export default Card;