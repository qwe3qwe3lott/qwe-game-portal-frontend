import React, {useCallback, useMemo} from 'react';
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

type Props = {
	children?: React.ReactNode
	api: GameApi<GamePlayer>
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
	api: GameApi<GamePlayer>
	selectIAmPlayer: (state: RootState) => boolean
	selectGameIsRunning: (state: RootState) => boolean
}
const BecomeButton: React.FC<BecomeButtonProps> = ({api, selectGameIsRunning, selectIAmPlayer}) => {
	const iAmPlayer = useAppSelector(selectIAmPlayer);
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	const becomeHandler = useCallback(() => {
		api.become(!iAmPlayer);
	}, [iAmPlayer]);
	const style = useMemo(() => {
		return iAmPlayer ? { backgroundColor: globalColors.secondaryColor } : undefined;
	}, [iAmPlayer]);
	return <button
		style={{ ...style, ...getBackgroundImageStyle(profile) }}
		className={styles.button}
		disabled={gameIsRunning}
		onClick={becomeHandler}/>;
};

type ChangeNicknameButtonProps = {
	selectGameIsRunning: (state: RootState) => boolean
	api: GameApi<GamePlayer>
}
const ChangeNicknameButton: React.FC<ChangeNicknameButtonProps> = ({selectGameIsRunning, api}) => {
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	return <MiniModalButton icon={pen} label={'Изменить ник'} formSet={{ form: NicknameForm, api }} disabled={gameIsRunning}/>;
};