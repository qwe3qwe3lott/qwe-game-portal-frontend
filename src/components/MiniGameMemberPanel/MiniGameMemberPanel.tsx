import React from 'react';
import styles from './MiniGameMemberPanel.module.scss';
import {GameApi} from '../../abstracts/GameApi';
import {RootState} from '../../store';
import NicknameForm from '../NicknameForm';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import globalColors from '../../colors.scss';
import MiniColumnPanel from '../MiniColumnPanel';
import {getBackgroundImageStyle} from '../../util/getBackgroundImageStyle';
import pen from '../../assets/pen.svg';
import profile from '../../assets/profile.svg';
import MiniModalButton from '../MiniModalButton';
import {GamePlayer} from '../../types/GamePlayer';
import {GameRoomOptions} from '../../types/GameRoomOptions';

type Props = {
	children?: React.ReactNode
	api: GameApi<GamePlayer, string, GameRoomOptions>
	selectIAmPlayer: (state: RootState) => boolean
	selectGameIsRunning: (state: RootState) => boolean
}
const MiniGameMemberPanel: React.FC<Props> = ({children, selectGameIsRunning, selectIAmPlayer, api}) => {
	return(<MiniColumnPanel>
		<BecomeButton api={api} selectGameIsRunning={selectGameIsRunning} selectIAmPlayer={selectIAmPlayer}/>
		<ChangeNicknameButton api={api} selectGameIsRunning={selectGameIsRunning}/>
		{children}
	</MiniColumnPanel>);
};

export default MiniGameMemberPanel;

type BecomeButtonProps = {
	api: GameApi<GamePlayer, string, GameRoomOptions>
	selectIAmPlayer: (state: RootState) => boolean
	selectGameIsRunning: (state: RootState) => boolean
}
const BecomeButton: React.FC<BecomeButtonProps> = ({api, selectGameIsRunning, selectIAmPlayer}) => {
	const iAmPlayer = useAppSelector(selectIAmPlayer);
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	const becomeHandler = () => api.become(!iAmPlayer);
	const style = iAmPlayer ? { backgroundColor: globalColors.secondaryColor } : undefined;
	return <button
		style={{ ...style, ...getBackgroundImageStyle(profile) }}
		className={styles.button}
		disabled={gameIsRunning}
		onClick={becomeHandler}
	/>;
};

type ChangeNicknameButtonProps = {
	selectGameIsRunning: (state: RootState) => boolean
	api: GameApi<GamePlayer, string, GameRoomOptions>
}
const ChangeNicknameButton: React.FC<ChangeNicknameButtonProps> = ({selectGameIsRunning, api}) => {
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	return <MiniModalButton icon={pen} label={'Изменить ник'} formSet={{ form: NicknameForm, api }} disabled={gameIsRunning}/>;
};