import {GameApi} from '../../abstracts/GameApi';
import {RootState} from '../../store';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import {useOwnerPanel} from '../../hooks/useOwnerPanel';
import styles from './MiniGameOwnerPanel.module.scss';
import React from 'react';
import MiniColumnPanel from '../MiniColumnPanel';
import penIcon from '../../assets/pen.svg';
import startIcon from '../../assets/start.svg';
import pauseIcon from '../../assets/pause.svg';
import stopIcon from '../../assets/stop.svg';
import {getBackgroundImageStyle} from '../../util/getBackgroundImageStyle';
import {GamePlayer} from '../../types/GamePlayer';
import {GameRoomOptions} from '../../types/GameRoomOptions';
import {PropsOfForm} from '../../types/PropsOfForm';
import MiniModalButton from '../MiniModalButton';

type Props = {
	api: GameApi<GamePlayer, string, GameRoomOptions>
	selectOwnerKey: (state: RootState) => string
	selectGameIsRunning: (state: RootState) => boolean
	selectGameIsOnPause: (state: RootState) => boolean
	selectRestrictionsToStart: (state: RootState) => string[]
	RoomTitleForm: React.FC<PropsOfForm>
}
const MiniGameOwnerPanel: React.FC<Props> = (props) => {
	const ownerKey = useAppSelector(props.selectOwnerKey);
	return ownerKey ? <Content {...props}/> : null;
};

export default MiniGameOwnerPanel;

const Content: React.FC<Props> = ({selectOwnerKey, selectGameIsRunning, selectGameIsOnPause, selectRestrictionsToStart, api, RoomTitleForm}) => {
	const { gameIsRunning, gameIsOnPause, startHandler, stopHandler, pauseHandler, restrictionsToStart }
		= useOwnerPanel(api, selectOwnerKey, selectGameIsRunning, selectGameIsOnPause, selectRestrictionsToStart);
	return(<MiniColumnPanel>
		<button
			style={getBackgroundImageStyle(startIcon)}
			className={styles.button}
			disabled={(gameIsRunning && !gameIsOnPause) || (!gameIsRunning && restrictionsToStart.length > 0)}
			onClick={startHandler}
		/>
		<button style={getBackgroundImageStyle(pauseIcon)} className={styles.button} disabled={!gameIsRunning || gameIsOnPause} onClick={pauseHandler}/>
		<button style={getBackgroundImageStyle(stopIcon)} className={styles.button} disabled={!gameIsRunning} onClick={stopHandler}/>
		<MiniModalButton label={'Переименновать комнату'} icon={penIcon} formSet={{ form: RoomTitleForm, api }}/>
	</MiniColumnPanel>);
};