import React, {FormEvent, useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/typedReduxHooks';
import {
	selectGameIsRunning,
	selectOwnerKey,
	selectOptionsOfCards
} from '../../store/selectors';
import styles from './OptionsOfCardsForm.module.scss';
import OptionsOfCards from '../OptionsOfCard';
import {useApi} from '../../Api';
import {addOptionsOfCard, setOptionsOfCards} from '../../store';
import {CardOptions} from '../../types/CardOptions';
import {PropsOfForm} from '../../../types/PropsOfForm';
import SubmitForm from '../../../components/SubmitForm';

const OptionsOfCardsForm: React.FC<PropsOfForm> = ({ onSuccess }) => {
	const api = useApi();
	useEffect(() => {
		api.requestOptionsOfCards();
	}, []);
	const useSubmitForm = () => {
		const ownerKey = useAppSelector(selectOwnerKey);
		const gameIsRunning = useAppSelector(selectGameIsRunning);
		const notAllowedToChange = gameIsRunning || !ownerKey;
		const optionsOfCards = useAppSelector(selectOptionsOfCards);
		const submitHandler = (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			api.changeRoomOptionsOfCards(ownerKey, optionsOfCards)
				.then(flag => { if (flag) onSuccess(); });
		};
		return { notAllowedToChange, submitHandler };
	};
	return <div className={styles.layout}>
		<FileButtons/>
		<SubmitForm useSubmitForm={useSubmitForm}>
			<OptionsOfCardsList/>
		</SubmitForm>
	</div>;
};

export default OptionsOfCardsForm;

const FileButtons: React.FC = () => {
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	const dispatch = useAppDispatch();
	const optionsOfCards = useAppSelector(selectOptionsOfCards);
	const importHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;
		const reader = new FileReader();
		function onReaderLoad(this: FileReader){
			const result = this.result;
			if (typeof result !== 'string') return;
			const cardsOptions = JSON.parse(result) as CardOptions[];
			if (typeof cardsOptions !== 'object' || !Array.isArray(cardsOptions)) return;
			for (let i = 0; i < cardsOptions.length; i++) {
				cardsOptions[i].id = i + 1;
				if (!cardsOptions[i].title) cardsOptions[i].title = '';
				if (!cardsOptions[i].url) cardsOptions[i].title = '';
			}
			dispatch(setOptionsOfCards(cardsOptions));
			// Чтобы позволить повторно импортировать тот же самый файл (иначе не срабатывает повторно onChange)
			event.target.value = '';
		}
		reader.onloadend = onReaderLoad;
		reader.readAsText(event.target?.files[0]);
	};
	const exportHandler = async () => {
		const fileName = 'optionsOfCards';
		const json = JSON.stringify(optionsOfCards.map(optionsOfCard => ({ title: optionsOfCard.title, url: optionsOfCard.url })));
		const blob = new Blob([json],{type:'application/json'});
		const href = await URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = href;
		link.download = fileName + '.json';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	return <div className={styles.buttons}>
		<label className={styles.fileButton} style={{ cursor: 'pointer', opacity: gameIsRunning ? 0.5 : 1 }}>
			<input disabled={gameIsRunning} type={'file'} name={'json'} accept={'application/json'} onChange={importHandler} style={{ display: 'none' }}/>
			Импорт списка
		</label>
		<button type={'button'} className={styles.fileButton} onClick={exportHandler}>Экспорт списка</button>
	</div>;
};

const OptionsOfCardsList: React.FC = () => {
	const optionsOfCards = useAppSelector(selectOptionsOfCards);
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