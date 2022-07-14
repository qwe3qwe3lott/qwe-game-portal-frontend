import {GameRoomOptions} from '../../types/GameRoomOptions';

export type RoomOptions = GameRoomOptions & {
    secondsToAsk: number
    secondsToAnswer: number
}