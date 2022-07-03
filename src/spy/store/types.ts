import {FieldCard} from '../types/FieldCard';
import {Sizes} from '../types/Sizes';
import {RoomOptions} from '../types/RoomOptions';
import {MembersRestriction} from '../types/MembersRestriction';
import {CardOptions} from '../types/CardOptions';
import {GameState} from '../../store/types';
import {Player} from '../types/Player';

export type State = GameState<Player> & {
    fieldCards: FieldCard[]
    sizes: Sizes
    card?: FieldCard
    lastWinner: string
    roomOptions: RoomOptions
    optionsOfCardsIdCounter: number
    optionsOfCards: CardOptions[]
    membersRestriction: MembersRestriction
}