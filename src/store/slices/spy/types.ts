import {Member} from '../../../types/Member';
import {FieldCard} from '../../../types/FieldCard';
import {Player} from '../../../types/Player';
import {Timer} from '../../../types/Timer';
import {LogRecord} from '../../../types/LogRecord';
import {Sizes} from '../../../types/Sizes';
import {RoomOptions} from '../../../types/RoomOptions';
import {MembersRestriction} from '../../../types/MembersRestriction';

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
    startConditionFlag: boolean
    sizes: Sizes
    timer: Timer
    card?: FieldCard
    logs: LogRecord[]
    lastWinner: string
    roomOptions: RoomOptions
    membersRestriction: MembersRestriction
}