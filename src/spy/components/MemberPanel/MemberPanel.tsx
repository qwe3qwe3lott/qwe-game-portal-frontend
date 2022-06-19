import React, {useCallback} from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import spyAPI from '../../api';
import styles from './MemberPanel.module.scss';
import NicknameButton from '../NicknameButton';
import OptionsButton from '../OptionsButton';

const MemberPanel: React.FC = () => {
	const iAmPlayer = useAppSelector(state => state.spy.iAmPlayer);
	const gameIsRunning = useAppSelector(state => state.spy.isRunning);

	const becomeHandler = useCallback(() => {
		spyAPI.become(!iAmPlayer);
	}, [iAmPlayer]);

	return(<div className={styles.layout}>
		<p>Панель участника</p>
		<button className={styles.button} disabled={gameIsRunning} onClick={becomeHandler}>{iAmPlayer ? 'Стать зрителем' : 'Стать игроком'}</button>
		<OptionsButton inGame={true}/>
		<NicknameButton/>
	</div>);
};

export default MemberPanel;