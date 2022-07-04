import React from 'react';

import Card from '../Card';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import {selectCard, selectGameIsRunning} from '../../store/selectors';
import ColumnPanel from '../../../components/ColumnPanel';
import {FieldCard} from '../../types/FieldCard';

const CardPanel: React.FC = () => {
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	const card = useAppSelector(selectCard);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const fakeHandler = (card: FieldCard) => {};
	return card && gameIsRunning ? <ColumnPanel title={'Ваша карта:'} center>
		<Card card={card} isDeco={true} captureCard={fakeHandler} askCard={fakeHandler}/>
	</ColumnPanel> : null;
};

export default CardPanel;