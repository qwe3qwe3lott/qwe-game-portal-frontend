import {FieldCard} from '../types/FieldCard';
import {Sizes} from '../types/Sizes';
import {RoomOptions} from '../types/RoomOptions';
import {CardOptions} from '../types/CardOptions';
import {GameState} from '../../store/types';
import {Player} from '../types/Player';
import {RoomStatus} from '../types/RoomStatus';

export type State = GameState<Player, RoomStatus, RoomOptions> & {
    fieldCards: FieldCard[]
    sizes: Sizes
    card?: FieldCard
    lastWinner: string
    optionsOfCardsIdCounter: number
    optionsOfCards: CardOptions[]
}