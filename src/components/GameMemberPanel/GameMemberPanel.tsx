import React from 'react';
import styles from './GameMemberPanel.module.scss';
import {GameApi} from '../../abstracts/GameApi';
import {RootState} from '../../store';
import ColumnPanel from '../ColumnPanel';
import ModalButton from '../ModalButton';
import NicknameForm from '../NicknameForm';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import globalColors from '../../colors.scss';
import {GamePlayer} from '../../types/GamePlayer';
import {GameRoomOptions} from '../../types/GameRoomOptions';

type Props = {
	children?: React.ReactNode
	api: GameApi<GamePlayer, string, GameRoomOptions>
	selectIAmPlayer: (state: RootState) => boolean
	selectGameIsRunning: (state: RootState) => boolean
}
const GameMemberPanel: React.FC<Props> = ({children, selectGameIsRunning, selectIAmPlayer, api}) => {
	return(<ColumnPanel title={'Панель участника'}>
		<BecomeButton api={api} selectGameIsRunning={selectGameIsRunning} selectIAmPlayer={selectIAmPlayer}/>
		<ChangeNicknameButton api={api} selectGameIsRunning={selectGameIsRunning}/>
		{children}
	</ColumnPanel>);
};

export default GameMemberPanel;

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
	return <button style={style} className={styles.button} disabled={gameIsRunning} onClick={becomeHandler}>{iAmPlayer ? 'Стать зрителем' : 'Стать игроком'}</button>;
};

type ChangeNicknameButtonProps = {
	selectGameIsRunning: (state: RootState) => boolean
	api: GameApi<GamePlayer, string, GameRoomOptions>
}
const ChangeNicknameButton: React.FC<ChangeNicknameButtonProps> = ({selectGameIsRunning, api}) => {
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	return <ModalButton label={'Изменить ник'} formSet={{ form: NicknameForm, api }} disabled={gameIsRunning}/>;
};