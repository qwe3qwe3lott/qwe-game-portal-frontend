import React, {FormEvent, useEffect} from 'react';
import {GameApi} from '../abstracts/GameApi';
import {GamePlayer} from '../types/GamePlayer';
import {GameRoomOptions} from '../types/GameRoomOptions';
import {RootState} from '../store';
import {useAppSelector} from '../hooks/typedReduxHooks';
import SubmitForm from './SubmitForm';

type Props = {
	onSuccess: () => void
	children: React.ReactNode
	className?: string
	api: GameApi<GamePlayer, string, GameRoomOptions>
	selectRoomOptions: (state: RootState) => GameRoomOptions,
	selectOwnerKey: (state: RootState) => string,
	selectGameIsRunning: (state: RootState) => boolean
}
const GameRoomOptionsForm: React.FC<Props> = ({onSuccess, children, className, api, selectOwnerKey, selectGameIsRunning, selectRoomOptions}) => {
	useEffect(() => {
		api.requestRoomOptions();
	}, []);
	const useSubmitForm = () => {
		const roomOptions = useAppSelector(selectRoomOptions);
		const ownerKey = useAppSelector(selectOwnerKey);
		const gameIsRunning = useAppSelector(selectGameIsRunning);
		const notAllowedToChange = gameIsRunning || !ownerKey;
		const submitHandler = (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			api.changeRoomOptions(ownerKey, roomOptions)
				.then(flag => { if (flag) onSuccess(); });
		};
		return { notAllowedToChange, submitHandler };
	};
	return <SubmitForm useSubmitForm={useSubmitForm} layoutClass={className}>
		{children}
	</SubmitForm>;
};

export default GameRoomOptionsForm;