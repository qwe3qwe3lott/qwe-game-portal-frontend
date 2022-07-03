import React from 'react';
import GameLogs from '../../components/GameLogs';
import {computeLastLogs, selectGameIsRunning, selectLogs} from '../store/selectors';

const Logs: React.FC = () => (<GameLogs selectGameIsRunning={selectGameIsRunning} selectLogs={selectLogs} computeLastLogs={computeLastLogs}/>);

export default Logs;