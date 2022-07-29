import {io, Socket} from 'socket.io-client';
import {AppDispatch} from '../store';
import {Member} from '../types/Member';
import {GameEvents} from '../enums/GameEvents';
import {PayloadAction} from '@reduxjs/toolkit';
import {LogRecord} from '../types/LogRecord';
import {Timer} from '../types/Timer';
import {GamePlayer} from '../types/GamePlayer';
import {GameRoomOptions} from '../types/GameRoomOptions';
import {ChangeOptionsDto} from '../dto/ChangeOptionsDto';
import {RenameRoomDto} from '../dto/RenameRoomDto';

export abstract class GameApi<PLAYER extends GamePlayer, STATUS extends string, OPTIONS extends GameRoomOptions> {
	protected _socket?: Socket;
	public get socket() { return this._socket; }
	protected constructor(
        protected readonly _appDispatch: AppDispatch,
        private readonly _setIAmPlayerFlag: (flag: boolean) => PayloadAction<boolean>,
        private readonly _setNickname: (nickname: string) => PayloadAction<string>
	) {}

    public abstract subscribe(): void
    // eslint-disable-next-line no-undef
    protected static createSocket(routePath: string) { return io(`${process.env.REACT_APP_BACKEND_URL}/${routePath}` ?? ''); }

    protected superSubscribe(
    	setMembers: (members: Member[]) => PayloadAction<Member[]>,
    	setOwnerKey: (ownerKey: string) => PayloadAction<string>,
    	setRoomStatus: (status: STATUS) => PayloadAction<STATUS>,
    	setRestrictionsToStart: (restrictions: string[]) => PayloadAction<string[]>,
    	setIAmActingFlag: (flag: boolean) => PayloadAction<boolean>,
    	setLogs: (logs: LogRecord[]) => PayloadAction<LogRecord[]>,
    	addLogRecord: (record: LogRecord) => PayloadAction<LogRecord>,
    	setTimer: (timer: Timer) => PayloadAction<Timer>,
    	setNickname: (nickname: string) => PayloadAction<string>,
    	setPlayers: (player: PLAYER[]) => PayloadAction<PLAYER[]>,
    	setRoomOptions: (options: OPTIONS) => PayloadAction<OPTIONS>,
    	setGameIsOnRunningFlag: (flag: boolean) => PayloadAction<boolean>,
    	setRoomTitle: (title: string) => PayloadAction<string>
    ): void {
    	this._socket?.on(GameEvents.GET_ROOM_OPTIONS, (roomOptions: OPTIONS) => {
    		this._appDispatch(setRoomOptions(roomOptions));
    	});
    	this._socket?.on(GameEvents.GET_PAUSE_FLAG, (flag: boolean) => {
    		this._appDispatch(setGameIsOnRunningFlag(flag));
    	});
    	this._socket?.on(GameEvents.GET_PLAYERS, (players: PLAYER[]) => {
    		this._appDispatch(setPlayers(players));
    	});
    	this._socket?.on(GameEvents.GET_MEMBERS, (members: Member[]) => {
    		this._appDispatch(setMembers(members));
    	});
    	this._socket?.on(GameEvents.GET_OWNER_KEY, (ownerKey: string) => {
    		this._appDispatch(setOwnerKey(ownerKey));
    	});
    	this._socket?.on(GameEvents.GET_ROOM_STATUS, (status: STATUS) => {
    		this._appDispatch(setRoomStatus(status));
    	});
    	this._socket?.on(GameEvents.GET_RESTRICTIONS_TO_START, (restrictions: string[]) => {
    		this._appDispatch(setRestrictionsToStart(restrictions));
    	});
    	this._socket?.on(GameEvents.GET_ACT_FLAG, (flag: boolean) => {
    		this._appDispatch(setIAmActingFlag(flag));
    	});
    	this._socket?.on(GameEvents.GET_ALL_LOG_RECORDS, (logs: LogRecord[]) => {
    		this._appDispatch(setLogs(logs));
    	});
    	this._socket?.on(GameEvents.GET_LOG_RECORD, (logRecord: LogRecord) => {
    		this._appDispatch(addLogRecord(logRecord));
    	});
    	this._socket?.on(GameEvents.GET_TIMER, (timer: Timer) => {
    		this._appDispatch(setTimer(timer));
    	});
    	this._socket?.on(GameEvents.GET_ROOM_TITLE, (title: string) => {
    		this._appDispatch(setRoomTitle(title));
    	});
    	this._socket?.on(GameEvents.GET_NICKNAME, ({ nickname, force } : { nickname: string, force: boolean }) => {
    		if (force) {
    			localStorage.setItem('nickname', nickname);
    			this._appDispatch(setNickname(nickname));
    			return;
    		}
    		const nick = localStorage.getItem('nickname');
    		if (!nick) {
    			this._appDispatch(setNickname(nickname));
    		} else {
    			this._socket?.emit(GameEvents.CHANGE_NICKNAME, nick, (flag: boolean) => {
    				this._appDispatch(setNickname(flag ? nick : nickname));
    			});
    		}
    	});
    }

    public describe () {
    	this._socket?.disconnect();
    	delete this._socket;
    }

    public async createRoom(): Promise<string> {
    	return new Promise(resolve => {
    		if (!this._socket) return resolve('');
    		this._socket.emit(GameEvents.CREATE_ROOM, undefined, (roomId: string) => {
    			resolve(roomId);
    		});
    	});
    }

    public async checkRoom(roomId: string) : Promise<boolean> {
    	return new Promise(resolve => {
    		if (!this._socket) return resolve(false);
    		this._socket.emit(GameEvents.CHECK_ROOM, roomId, (flag: boolean) => {
    			resolve(flag);
    		});
    	});
    }

    public async joinRoom(roomId: string) : Promise<boolean> {
    	return new Promise(resolve => {
    		if (!this._socket) return resolve(false);
    		this._socket.emit(GameEvents.JOIN_ROOM, roomId, (flag: boolean) => {
    			resolve(flag);
    		});
    	});
    }

    public become(becomePlayer: boolean) {
    	this._socket?.emit(GameEvents.BECOME, becomePlayer, (flag: boolean) => {
    		if (flag) this._appDispatch(this._setIAmPlayerFlag(becomePlayer));
    	});
    }

    public leaveRoom() {
    	this._socket?.emit(GameEvents.LEAVE_ROOM, undefined);
    }

    public startGame(ownerKey: string) {
    	this._socket?.emit(GameEvents.START_GAME, ownerKey);
    }

    public renameRoom(ownerKey: string, roomTitle: string): Promise<boolean> {
    	return new Promise(resolve => {
    		if (!this._socket) return resolve(false);
    		const renameRoomDto: RenameRoomDto = { ownerKey, roomTitle };
    		this._socket.emit(GameEvents.RENAME_ROOM, renameRoomDto, (flag: boolean) => {
    			resolve(flag);
    		});
    	});
    }

    public pauseGame(ownerKey: string) {
    	this._socket?.emit(GameEvents.PAUSE_GAME, ownerKey);
    }

    public requestTimer() {
    	this._socket?.emit(GameEvents.REQUEST_TIMER);
    }

    public requestRoomOptions() {
    	this._socket?.emit(GameEvents.REQUEST_ROOM_OPTIONS);
    }

    public resumeGame(ownerKey: string) {
    	this._socket?.emit(GameEvents.RESUME_GAME, ownerKey);
    }

    public stopGame(ownerKey: string) {
    	this._socket?.emit(GameEvents.STOP_GAME, ownerKey);
    }

    public async changeNickname(nickname: string) : Promise<string> {
    	return new Promise(resolve => {
    		if (!this._socket) return resolve('');
    		this._socket.emit(GameEvents.CHANGE_NICKNAME, nickname, (nickname: string) => {
    			if (nickname) {
    				this._appDispatch(this._setNickname(nickname));
    				localStorage.setItem('nickname', nickname);
    			}
    			resolve(nickname);
    		});
    	});
    }

    public async changeRoomOptions(ownerKey: string, roomOptions: OPTIONS) : Promise<boolean> {
    	return new Promise(resolve => {
    		if (!this._socket) return resolve(false);
    		const optionsDto: ChangeOptionsDto<OPTIONS> = { options: roomOptions, ownerKey };
    		this._socket.emit(GameEvents.CHANGE_ROOM_OPTIONS, optionsDto, (flag: boolean) => {
    			resolve(flag);
    		});
    	});
    }
}