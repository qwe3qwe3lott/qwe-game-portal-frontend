import {Member} from '../../../types/Member';
import {FieldCard} from '../../../types/FieldCard';
import {Player} from '../../../types/Player';

export type SpyState = {
    nickname: string
    ownerKey: string
    members: Member[]
    iAmPlayer: boolean
    isRunning: boolean
    isOnPause: boolean
    iAmActing: boolean
    fieldCards: FieldCard[]
    players: Player[]
    startConditionFlag: boolean,
    sizes: { rows: number, columns: number }
}