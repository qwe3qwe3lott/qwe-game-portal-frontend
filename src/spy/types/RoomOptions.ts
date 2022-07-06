import {GameRoomOptions} from '../../types/GameRoomOptions';

export type RoomOptions = GameRoomOptions & {
    rows: number
    columns: number
    secondsToAct: number
    winScore: number
}