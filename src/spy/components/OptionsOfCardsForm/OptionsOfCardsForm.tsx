import React, {FormEvent, useCallback, useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/typedReduxHooks';
import {
	selectGameIsRunning,
	selectOwnerKey,
	selectRoomOptionOptionsOfCards
} from '../../store/selectors';
import styles from './OptionsOfCardsForm.module.scss';
import OptionsOfCards from '../OptionsOfCard';
import {useApi} from '../../Api';
import {addOptionsOfCard} from '../../store';
import {GameApi} from '../../../abstracts/GameApi';

type Props = {
	onSuccess: () => void
	api: GameApi
}
const OptionsOfCardsForm: React.FC<Props> = ({ onSuccess }) => {
	return(<SubmitForm onSuccess={onSuccess}>
		<OptionsOfCardsList/>
	</SubmitForm>);
};

export default OptionsOfCardsForm;

const OptionsOfCardsList: React.FC = () => {
	const optionsOfCards = useAppSelector(selectRoomOptionOptionsOfCards);
	const dispatch = useAppDispatch();
	const addHandler = useCallback(() => {
		dispatch(addOptionsOfCard());
	}, []);
	return(<ul className={styles.list}>
		{optionsOfCards.map(optionsOfCard => <OptionsOfCards key={optionsOfCard.id} cardOptions={optionsOfCard}/>)}
		<li className={styles.gridCenter}>
			<button type={'button'} onClick={addHandler} className={styles.addButton}/>
		</li>
	</ul>);
};

type SubmitFormProps = {
	onSuccess: () => void
	children: React.ReactNode
}
// Помогает избежать лишних ре-рендеров
const SubmitForm: React.FC<SubmitFormProps> = ({onSuccess, children}) => {
	const api = useApi();
	const optionsOfCards = useAppSelector(selectRoomOptionOptionsOfCards);
	const ownerKey = useAppSelector(selectOwnerKey);
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	useEffect(() => {
		api.requestOptionsOfCards();
	}, []);
	const notAllowedToChange = useMemo(() => {
		return gameIsRunning || !ownerKey;
	}, [ownerKey, gameIsRunning]);
	const submitHandler = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		api.changeRoomOptionsOfCards(ownerKey, optionsOfCards)
			.then(flag => { if (flag) onSuccess(); });
	}, [onSuccess, optionsOfCards, ownerKey]);
	return(<form onSubmit={submitHandler}>
		<fieldset disabled={notAllowedToChange}>
			<div className={styles.layout}>
				{children}
				<input type={'submit'} className={styles.button}/>
			</div>
		</fieldset>
	</form>);
};