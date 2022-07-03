import {Member} from '../types/Member';
import {RoomStatuses} from '../enums/RoomStatuses';
import {Timer} from '../types/Timer';
import {LogRecord} from '../types/LogRecord';
import {GamePlayer} from '../types/GamePlayer';

export type GameState<P extends GamePlayer> = {
    ownerKey: string
    members: Member[]
    iAmPlayer: boolean
    roomStatus: RoomStatuses
    iAmActing: boolean
    players: P[]
    restrictionsToStart: string[]
    timer: Timer
    logs: LogRecord[]
}