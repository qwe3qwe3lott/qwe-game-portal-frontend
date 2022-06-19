import {CardOptions} from './CardOptions';

export type RoomOptions = {
    minPlayers: number
    maxPlayers: number
    rows: number
    columns: number
    secondsToAct: number
    winScore: number
    optionsOfCards: CardOptions[]
}