import {GameRoomOptions} from '../types/GameRoomOptions';

export type ChangeOptionsDto<O extends GameRoomOptions> = {
    ownerKey: string
    options: O
}