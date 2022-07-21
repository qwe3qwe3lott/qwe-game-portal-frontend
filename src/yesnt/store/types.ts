import {GameState} from '../../store/types';
import {Player} from '../types/Player';
import {RoomStatus} from '../types/RoomStatus';
import {RoomOptions} from '../types/RoomOptions';
import {Answers} from '../enums/Answers';
import {Result} from '../types/Result';

export type State = GameState<Player, RoomStatus, RoomOptions> & {
    question: string
    answer?: Answers
    result?: Result
    countOfAnswers: number
}
