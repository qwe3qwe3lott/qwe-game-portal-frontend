import React, {FormEvent, useEffect} from 'react';
import {GameApi} from '../../abstracts/GameApi';
import {GamePlayer} from '../../types/GamePlayer';
import {GameRoomOptions} from '../../types/GameRoomOptions';
import {RootState} from '../../store';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import styles from './GameRoomOptionsForm.module.scss';

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
	const roomOptions = useAppSelector(selectRoomOptions);
	const ownerKey = useAppSelector(selectOwnerKey);
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	useEffect(() => {
		api.requestRoomOptions();
	}, []);
	const notAllowedToChange = gameIsRunning || !ownerKey;
	const submitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		api.changeRoomOptions(ownerKey, roomOptions)
			.then(flag => { if (flag) onSuccess(); });
	};
	const computedClassName = `${styles.layout} ${className}`;
	return(<form onSubmit={submitHandler}>
		<fieldset disabled={notAllowedToChange}>
			<div className={computedClassName}>
				{children}
				<input type={'submit'} className={styles.submitButton}/>
			</div>
		</fieldset>
	</form>);
};

export default GameRoomOptionsForm;