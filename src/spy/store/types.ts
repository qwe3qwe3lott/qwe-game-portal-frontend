import {FieldCard} from '../types/FieldCard';
import {Sizes} from '../types/Sizes';
import {RoomOptions} from '../types/RoomOptions';
import {MembersRestriction} from '../types/MembersRestriction';
import {CardOptions} from '../types/CardOptions';
import {GameState} from '../../store/types';

export type State = GameState & {
    fieldCards: FieldCard[]
    sizes: Sizes
    card?: FieldCard
    lastWinner: string
    roomOptions: RoomOptions
    optionsOfCardsIdCounter: number
    optionsOfCards: CardOptions[]
    membersRestriction: MembersRestriction
}