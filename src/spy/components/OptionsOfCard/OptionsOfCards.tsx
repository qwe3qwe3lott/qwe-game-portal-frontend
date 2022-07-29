import {CardOptions} from '../../types/CardOptions';
import React, {ChangeEvent, useCallback, useState} from 'react';
import styles from './OptionsOfCards.module.scss';
import {useAppDispatch} from '../../../hooks/typedReduxHooks';
import {changeOptionTitleOfCard, changeOptionUrlOfCard, deleteOptionsOfCard} from '../../store';

type Props = {
    cardOptions: CardOptions
}
const OptionsOfCards: React.FC<Props> = ({ cardOptions }) => {
	const [hidden, setHidden] = useState(true);
	const visibilityHandler = useCallback(() => {
		setHidden(!hidden);
	}, [hidden]);
	return hidden ?
		<OptionsOfCardsHidden visibilityHandler={visibilityHandler} cardOptions={cardOptions}/> :
		<OptionsOfCardsShowed visibilityHandler={visibilityHandler} cardOptions={cardOptions}/>;
};

export default React.memo(OptionsOfCards);

type OptionsOfCardsProps = Props & {
    visibilityHandler: () => void
}

const OptionsOfCardsHidden: React.FC<OptionsOfCardsProps> = ({ cardOptions, visibilityHandler }) => {
	return(<li className={styles.miniLayout} onClick={visibilityHandler} role={'button'} tabIndex={0}>
		{cardOptions.title}
		<label className={styles.hidden}>
            Название
			<input
				required
				type={'text'}
				minLength={3}
				maxLength={20}
				defaultValue={cardOptions.title}
			/>
		</label>
		<label className={styles.hidden}>
            Ссылка на изображение:
			<input
				required
				type={'url'}
				defaultValue={cardOptions.url}
			/>
		</label>
	</li>);
};
const OptionsOfCardsShowed: React.FC<OptionsOfCardsProps> = ({ cardOptions, visibilityHandler }) => {
	const dispatch = useAppDispatch();
	const titleHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeOptionTitleOfCard({ id: cardOptions.id, title: event.target.value }));
	}, [cardOptions]);
	const urlHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeOptionUrlOfCard({ id: cardOptions.id, url: event.target.value }));
	}, [cardOptions]);
	const deleteHandler = useCallback(() => {
		dispatch(deleteOptionsOfCard(cardOptions.id));
	}, [cardOptions]);
	return(<li className={styles.layout}>
		<div className={styles.fields}>
			<label className={styles.topLabel}>
				Название
				<input
					required
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
					required
					type={'url'}
					value={cardOptions.url}
					className={styles.input}
					onChange={urlHandler}
				/>
			</label>
		</div>
		<div className={styles.buttons}>
			<div role={'button'} tabIndex={0} className={styles.close} onClick={visibilityHandler}/>
			<button type={'button'} className={styles.delete} onClick={deleteHandler}/>
		</div>
	</li>);
};