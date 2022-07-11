import React from 'react';
import styles from './GameField.module.scss';
import AskingSection from '../AskingSection';
import AnsweringSection from '../AnsweringSection';
import ResultSection from '../ResultSection';
import GameRoomStatusBar from '../../../components/GameRoomStatusBar/GameRoomStatusBar';
import {selectGameIsOnPause, selectGameIsRunning} from '../../store/selectors';
import {useAppSelector} from '../../../hooks/typedReduxHooks';


type Props = {
	className?: string
}
const GameField: React.FC<Props> = ({className}) => {
	const layoutClass = `${styles.layout} ${className}`;
	return(<div className={layoutClass}>
		<GameRoomStatusBar selectGameIsRunning={selectGameIsRunning} selectGameIsOnPause={selectGameIsOnPause}/>
		<Content/>
	</div>);
};

export default GameField;

const Content: React.FC = () => {
	const gameIsRunning = useAppSelector(selectGameIsRunning);
	return gameIsRunning ? <div className={styles.sectionsLayout}>
		<AskingSection/>
		<AnsweringSection/>
		<ResultSection/>
	</div> : null;
};