import React from 'react';
import {GameApi} from '../../../abstracts/GameApi';
import {GamePlayer} from '../../../types/GamePlayer';
import {GameRoomOptions} from '../../../types/GameRoomOptions';
import {Api, useApi} from '../../Api';
import GameRoomOptionsForm from '../../../components/GameRoomOptionsForm';
import GameRoomOptionsNumberInput from '../../../components/GameRoomOptionsNumberInput';
import styles from './RoomOptionsForm.module.scss';
import {
	selectGameIsRunning,
	selectOwnerKey, selectRoomMaxPlayers, selectRoomMinPlayers,
	selectRoomOptions, selectRoomOptionsSecondsToAnswer,
	selectRoomOptionsSecondsToAsk
} from '../../store/selectors';
import {setOptionMaxPlayers, setOptionMinPlayers, setOptionSecondsToAnswer, setOptionSecondsToAsk} from '../../store';

type Props = {
    onSuccess: () => void
	api: GameApi<GamePlayer, string, GameRoomOptions>
}

const RoomOptionsForm: React.FC<Props> = ({ onSuccess }) => {
	const api = useApi();
	return(<GameRoomOptionsForm
		onSuccess={onSuccess}
		selectRoomOptions={selectRoomOptions}
		selectGameIsRunning={selectGameIsRunning}
		api={api}
		selectOwnerKey={selectOwnerKey}
		className={styles.layout}
	>
		<GameRoomOptionsNumberInput
			min={Api.MIN_SECONDS_TO_ASK} max={Api.MAX_SECONDS_TO_ASK} selector={selectRoomOptionsSecondsToAsk}
			action={setOptionSecondsToAsk} label={'Секунд на написание вопроса:'}/>
		<GameRoomOptionsNumberInput
			min={Api.MIN_SECONDS_TO_ANSWER} max={Api.MAX_SECONDS_TO_ANSWER} selector={selectRoomOptionsSecondsToAnswer}
			action={setOptionSecondsToAnswer} label={'Седунд для ответа:'}/>
		<GameRoomOptionsNumberInput
			min={Api.MIN_MIN_PLAYERS} max={Api.MAX_MIN_PLAYERS} selector={selectRoomMinPlayers}
			action={setOptionMinPlayers} label={'Минимум игроков:'}/>
		<GameRoomOptionsNumberInput
			min={Api.MIN_MAX_PLAYERS} max={Api.MAX_MAX_PLAYERS} selector={selectRoomMaxPlayers}
			action={setOptionMaxPlayers} label={'Максимум игроков:'}/>
	</GameRoomOptionsForm>);
};

export default RoomOptionsForm;