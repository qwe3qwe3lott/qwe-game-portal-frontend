import React from 'react';

import Card from '../Card';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import {selectCard} from '../../store/selectors';
import ColumnPanel from '../../../components/ColumnPanel';
import {FieldCard} from '../../types/FieldCard';

const CardPanel: React.FC = () => {
	const card = useAppSelector(selectCard);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const fakeHandler = (card: FieldCard) => {};
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const secondFakeHandler = (card: FieldCard) => ('');
	return card ? <ColumnPanel title={'Ваша карта:'} center>
		<Card card={card} isDeco={true} getAnimationClass={secondFakeHandler} captureCard={fakeHandler} askCard={fakeHandler}/>
	</ColumnPanel> : null;
};

export default CardPanel;