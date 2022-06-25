import React, {ChangeEvent, useCallback, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/typedReduxHooks';
import {selectRoomOptionOptionsOfCards} from '../../store/selectors';
import styles from './OptionsOfCardsList.module.scss';
import {CardOptions} from '../../types/CardOptions';
import {changeOptionTitleOfCard, changeOptionUrlOfCard} from '../../store';

const OptionsOfCardsList: React.FC = () => {
	const optionsOfCards = useAppSelector(selectRoomOptionOptionsOfCards);
	return(<ul className={styles.layout}>
		{optionsOfCards.map(optionsOfCard => <OptionsOfCardsItem key={optionsOfCard.id} cardOptions={optionsOfCard}/>)}
	</ul>);
};

export default OptionsOfCardsList;

type OptionsOfCardsItemProps = {
	cardOptions: CardOptions
}
const OptionsOfCardsItem: React.FC<OptionsOfCardsItemProps> = ({ cardOptions }) => {
	const [hidden, setHidden] = useState(true);
	const visibilityHandler = useCallback(() => {
		setHidden(!hidden);
	}, [hidden]);
	return hidden ?
		<OptionsOfCardsItemHidden visibilityHandler={visibilityHandler} cardOptions={cardOptions}/> :
		<OptionsOfCardsItemShowed visibilityHandler={visibilityHandler} cardOptions={cardOptions}/>;
};

type OptionsOfCardsItemStatedProps = OptionsOfCardsItemProps & {
	visibilityHandler: () => void
}
const OptionsOfCardsItemHidden: React.FC<OptionsOfCardsItemStatedProps> = ({ cardOptions, visibilityHandler }) => {
	return(<li>
		<button className={styles.showButton} onClick={visibilityHandler}>{cardOptions.title}</button>
	</li>);
};
const OptionsOfCardsItemShowed: React.FC<OptionsOfCardsItemStatedProps> = ({ cardOptions }) => {
	const dispatch = useAppDispatch();
	const titleHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeOptionTitleOfCard({ id: cardOptions.id, title: event.target.value }));
	}, []);
	const urlHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeOptionUrlOfCard({ id: cardOptions.id, url: event.target.value }));
	}, []);
	return(<li className={styles.showedItem}>
		<label className={styles.topLabel}>
			Название
			<input
				type={'text'}
				minLength={3}
				maxLength={20}
				value={cardOptions.title}
				className={styles.input}
				onChange={titleHandler}
			/>
		</label>
		<label className={styles.topLabel}>
			Ссылка на изображение:
			<input
				type={'url'}
				value={cardOptions.url}
				className={styles.input}
				onChange={urlHandler}
			/>
		</label>
	</li>);
};