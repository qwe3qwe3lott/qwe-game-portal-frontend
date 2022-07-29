import {GameApi} from '../abstracts/GameApi';
import {GamePlayer} from './GamePlayer';
import {GameRoomOptions} from './GameRoomOptions';

export type PropsOfForm = {
    onSuccess: () => void
    api: GameApi<GamePlayer, string, GameRoomOptions>
}