import {Member} from '../types/Member';
import {Timer} from '../types/Timer';
import {LogRecord} from '../types/LogRecord';
import {GamePlayer} from '../types/GamePlayer';
import {MembersRestriction} from '../types/MembersRestriction';
import {GameRoomOptions} from '../types/GameRoomOptions';

export type GameState<PLAYER extends GamePlayer, STATUS extends string, OPTIONS extends GameRoomOptions> = {
    ownerKey: string
    members: Member[]
    membersRestriction: MembersRestriction
    iAmPlayer: boolean
    roomStatus: STATUS
    iAmActing: boolean
    gameIsOnPause: boolean
    players: PLAYER[]
    restrictionsToStart: string[]
    timer: Timer
    logs: LogRecord[]
    roomOptions: OPTIONS
    roomTitle: string
}