import {Member} from '../types/Member';
import {Timer} from '../types/Timer';
import {LogRecord} from '../types/LogRecord';
import {GamePlayer} from '../types/GamePlayer';
import {GameRoomStatus} from '../types/GameRoomStatus';
import {MembersRestriction} from '../types/MembersRestriction';
import {GameRoomOptions} from '../types/GameRoomOptions';

export type GameState<P extends GamePlayer, S extends GameRoomStatus, O extends GameRoomOptions> = {
    ownerKey: string
    members: Member[]
    membersRestriction: MembersRestriction
    iAmPlayer: boolean
    roomStatus: S
    iAmActing: boolean
    players: P[]
    restrictionsToStart: string[]
    timer: Timer
    logs: LogRecord[]
    roomOptions: O
}