import {GameApi} from '../../abstracts/GameApi';
import {RootState} from '../../store';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import {useOwnerPanel} from '../../hooks/useOwnerPanel';
import styles from './MiniGameOwnerPanel.module.scss';
import React from 'react';
import MiniColumnPanel from '../MiniColumnPanel';
import startIcon from '../../assets/start.svg';
import pauseIcon from '../../assets/pause.svg';
import stopIcon from '../../assets/stop.svg';
import {getBackgroundImageStyle} from '../../util/getBackgroundImageStyle';

type Props = {
	api: GameApi
	selectOwnerKey: (state: RootState) => string
	selectGameIsRunning: (state: RootState) => boolean
	selectGameIsOnPause: (state: RootState) => boolean
	selectRestrictionsToStart: (state: RootState) => string[]
}
const MiniGameOwnerPanel: React.FC<Props> = (props) => {
	const ownerKey = useAppSelector(props.selectOwnerKey);
	return ownerKey ? <Content {...props}/> : null;
};

export default MiniGameOwnerPanel;

const Content: React.FC<Props> = ({selectOwnerKey, selectGameIsRunning, selectGameIsOnPause, selectRestrictionsToStart, api}) => {
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
	</MiniColumnPanel>);
};