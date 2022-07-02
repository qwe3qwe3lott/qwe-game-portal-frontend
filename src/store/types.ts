import {Member} from '../types/Member';
import {RoomStatuses} from '../enums/RoomStatuses';
import {Player} from '../spy/types/Player';
import {Timer} from '../types/Timer';
import {LogRecord} from '../types/LogRecord';

export type GameState = {
    ownerKey: string
    members: Member[]
    iAmPlayer: boolean
    roomStatus: RoomStatuses
    iAmActing: boolean
    players: Player[]
    restrictionsToStart: string[]
    timer: Timer
    logs: LogRecord[]
}