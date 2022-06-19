import React, {useCallback} from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import api from '../../api';
import styles from './MemberPanel.module.scss';
import NicknameButton from '../NicknameButton';
import OptionsButton from '../OptionsButton';
import {selectGameIsRunning, selectIAmPlayer} from '../../store/selectors';

const MemberPanel: React.FC = () => {
	const iAmPlayer = useAppSelector(selectIAmPlayer);
	const gameIsRunning = useAppSelector(selectGameIsRunning);

	const becomeHandler = useCallback(() => {
		api.become(!iAmPlayer);
	}, [iAmPlayer]);

	return(<div className={styles.layout}>
		<p>Панель участника</p>
		<button className={styles.button} disabled={gameIsRunning} onClick={becomeHandler}>{iAmPlayer ? 'Стать зрителем' : 'Стать игроком'}</button>
		<OptionsButton inGame={true}/>
		<NicknameButton/>
	</div>);
};

export default MemberPanel;