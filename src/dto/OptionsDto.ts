import {GameRoomOptions} from '../types/GameRoomOptions';

export type OptionsDto<O extends GameRoomOptions> = {
    ownerKey: string
    options: O
}