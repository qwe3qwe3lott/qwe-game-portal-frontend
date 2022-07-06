import {GameState} from '../../store/types';
import {Player} from '../types/Player';
import {RoomStatus} from '../types/RoomStatus';
import {RoomOptions} from '../types/RoomOptions';

export type State = GameState<Player, RoomStatus, RoomOptions>
