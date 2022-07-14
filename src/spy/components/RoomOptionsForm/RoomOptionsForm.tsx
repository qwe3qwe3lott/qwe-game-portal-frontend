import React from 'react';
import {GameApi} from '../../../abstracts/GameApi';
import {GamePlayer} from '../../../types/GamePlayer';
import {GameRoomOptions} from '../../../types/GameRoomOptions';
import {Api, useApi} from '../../Api';
import GameRoomOptionsForm from '../../../components/GameRoomOptionsForm';
import GameRoomOptionsNumberInput from '../../../components/GameRoomOptionsNumberInput';
import {
	selectGameIsRunning, selectOwnerKey, selectRoomMaxPlayers, selectRoomMinPlayers, selectRoomOptionColumns,
	selectRoomOptionRows,
	selectRoomOptions,
	selectRoomOptionSecondsToAct, selectRoomOptionWinScore
} from '../../store/selectors';
import {
	setOptionColumns, setOptionMaxPlayers,
	setOptionMinPlayers,
	setOptionRows,
	setOptionSecondsToAct,
	setOptionWinScore
} from '../../store';
import styles from './RoomOptionsForm.module.scss';

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
			min={Api.MIN_SECONDS_TO_ACT} max={Api.MAX_SECONDS_TO_ACT} selector={selectRoomOptionSecondsToAct} action={setOptionSecondsToAct} label={'Секунд на ход:'}/>
		<GameRoomOptionsNumberInput
			min={Api.MIN_WIN_SCORE} max={Api.MAX_WIN_SCORE} selector={selectRoomOptionWinScore} action={setOptionWinScore} label={'Очков для победы:'}/>
		<GameRoomOptionsNumberInput
			min={Api.MIN_COLUMNS} max={Api.MAX_COLUMNS} selector={selectRoomOptionColumns} action={setOptionColumns} label={'Колонок с картами:'}/>
		<GameRoomOptionsNumberInput
			min={Api.MIN_ROWS} max={Api.MAX_ROWS} selector={selectRoomOptionRows} action={setOptionRows} label={'Строк с картами:'}/>
		<GameRoomOptionsNumberInput
			min={Api.MIN_MIN_PLAYERS} max={Api.MAX_MIN_PLAYERS} selector={selectRoomMinPlayers} action={setOptionMinPlayers} label={'Минимум игроков:'}/>
		<GameRoomOptionsNumberInput
			min={Api.MIN_MAX_PLAYERS} max={Api.MAX_MAX_PLAYERS} selector={selectRoomMaxPlayers} action={setOptionMaxPlayers} label={'Максимум игроков:'}/>
	</GameRoomOptionsForm>);
};

export default RoomOptionsForm;