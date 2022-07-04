import playersListFactory from '../../components/GamePlayersList';
import {Player} from '../types/Player';
import React from 'react';
import {selectGameIsRunning, selectPlayers} from '../store/selectors';
import PlayerItem from './PlayerItem';

const PlayersListInstance = playersListFactory<Player>();

const PlayersList: React.FC = () => <PlayersListInstance selectGameIsRunning={selectGameIsRunning} selectPlayers={selectPlayers} Item={PlayerItem}/>;

export default PlayersList;