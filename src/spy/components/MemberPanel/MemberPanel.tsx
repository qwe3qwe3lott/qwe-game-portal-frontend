import React, {useCallback, useMemo} from 'react';
import {useAppSelector} from '../../../hooks/typedReduxHooks';
import styles from './MemberPanel.module.scss';
import RoomOptionsButton from '../RoomOptionsButton';
import {selectGameIsRunning, selectIAmPlayer} from '../../store/selectors';
import {useApi} from '../../Api';
import OptionsOfCardsButton from '../OptionsOfCardsButton';
import globalColors from '../../../colors.scss';
import NicknameForm from '../NicknameForm';
import ModalButton from '../../../components/ModalButton';

type Props = {
	mini?: boolean
}
const MemberPanel: React.FC<Props> = ({ mini }) => {
	return(<>
		{mini ? <>
			<div className={styles.miniLayout}>
				<BecomeButton mini/>
			</div>
		</> : <>
			<div className={styles.layout}>
				<p className={styles.title}>Панель участника</p>
				<BecomeButton/>
				<RoomOptionsButton/>
				<OptionsOfCardsButton/>
				<ModalButton label={'Изменить ник'} Form={NicknameForm}/>
			</div>
		</>}
	</>);
};

export default MemberPanel;

type BecomeButtonProps = {
	mini?: boolean
}
const BecomeButton: React.FC<BecomeButtonProps> = ({ mini }) => {
	const api = useApi();
	const iAmPlayer = useAppSelector(selectIAmPlayer);
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	const becomeHandler = useCallback(() => {
		api.become(!iAmPlayer);
	}, [iAmPlayer]);
	const style = useMemo(() => {
		return iAmPlayer ? { backgroundColor: globalColors.secondaryColor } : {};
	}, [iAmPlayer]);
	return mini ? <button style={style} className={styles.miniButton} onClick={becomeHandler} disabled={gameIsRunning}/> :
		<button style={style} className={styles.button} disabled={gameIsRunning} onClick={becomeHandler}>{iAmPlayer ? 'Стать зрителем' : 'Стать игроком'}</button>;
};