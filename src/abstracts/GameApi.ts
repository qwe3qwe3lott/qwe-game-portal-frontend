import {io, Socket} from 'socket.io-client';
import {AppDispatch} from '../store';
import {Member} from '../types/Member';
import {GameEvents} from '../enums/GameEvents';
import {PayloadAction} from '@reduxjs/toolkit';
import {LogRecord} from '../types/LogRecord';
import {RoomStatuses} from '../enums/RoomStatuses';
import {Timer} from '../types/Timer';
import {GamePlayer} from '../types/GamePlayer';

export abstract class GameApi<P extends GamePlayer> {
    protected _socket?: Socket;
    public get socket() { return this._socket; }
    protected constructor(
        protected readonly _appDispatch: AppDispatch,
        private readonly _setIAmPlayerFlag: (flag: boolean) => PayloadAction<boolean>,
        private readonly _setNickname: (nickname: string) => PayloadAction<string>
    ) {}

    public abstract subscribe(): void
    protected static createSocket(routePath: string) { return io(`${process.env.REACT_APP_BACKEND_URL}/${routePath}` ?? ''); }

    protected superSubscribe(
    	setMembers: (members: Member[]) => PayloadAction<Member[]>,
    	setOwnerKey: (ownerKey: string) => PayloadAction<string>,
    	setRoomStatus: (status: RoomStatuses) => PayloadAction<RoomStatuses>,
    	setRestrictionsToStart: (restrictions: string[]) => PayloadAction<string[]>,
    	setIAmActingFlag: (flag: boolean) => PayloadAction<boolean>,
    	setLogs: (logs: LogRecord[]) => PayloadAction<LogRecord[]>,
    	addLogRecord: (record: LogRecord) => PayloadAction<LogRecord>,
    	setTimer: (timer: Timer) => PayloadAction<Timer>,
    	setNickname: (nickname: string) => PayloadAction<string>,
    	setPlayers: (player: P[]) => PayloadAction<P[]>
    ): void {
    	this._socket?.on(GameEvents.GET_PLAYERS, (players: P[]) => {
    		console.log(GameEvents.GET_PLAYERS, players);
    		this._appDispatch(setPlayers(players));
    	});
    	this._socket?.on(GameEvents.GET_MEMBERS, (members: Member[]) => {
    		console.log(GameEvents.GET_MEMBERS, members);
    		this._appDispatch(setMembers(members));
    	});
    	this._socket?.on(GameEvents.GET_OWNER_KEY, (ownerKey: string) => {
    		console.log(GameEvents.GET_OWNER_KEY, ownerKey);
    		this._appDispatch(setOwnerKey(ownerKey));
    	});
    	this._socket?.on(GameEvents.GET_ROOM_STATUS, (status: RoomStatuses) => {
    		console.log(GameEvents.GET_ROOM_STATUS, status);
    		this._appDispatch(setRoomStatus(status));
    	});
    	this._socket?.on(GameEvents.GET_RESTRICTIONS_TO_START, (restrictions: string[]) => {
    		console.log(GameEvents.GET_RESTRICTIONS_TO_START, restrictions);
    		this._appDispatch(setRestrictionsToStart(restrictions));
    	});
    	this._socket?.on(GameEvents.GET_ACT_FLAG, (flag: boolean) => {
    		console.log(GameEvents.GET_ACT_FLAG, flag);
    		this._appDispatch(setIAmActingFlag(flag));
    	});
    	this._socket?.on(GameEvents.GET_ALL_LOG_RECORDS, (logs: LogRecord[]) => {
    		console.log(GameEvents.GET_ALL_LOG_RECORDS, logs);
    		this._appDispatch(setLogs(logs));
    	});
    	this._socket?.on(GameEvents.GET_LOG_RECORD, (logRecord: LogRecord) => {
    		console.log(GameEvents.GET_LOG_RECORD, logRecord);
    		this._appDispatch(addLogRecord(logRecord));
    	});
    	this._socket?.on(GameEvents.GET_TIMER, (timer: Timer) => {
    		console.log(GameEvents.GET_TIMER, timer);
    		this._appDispatch(setTimer(timer));
    	});
    	this._socket?.on(GameEvents.GET_NICKNAME, ({ nickname, force } : { nickname: string, force: boolean }) => {
    		console.log(GameEvents.GET_NICKNAME, nickname);
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
    		console.log(GameEvents.CREATE_ROOM);
    		this._socket.emit(GameEvents.CREATE_ROOM, undefined, (roomId: string) => {
    			resolve(roomId);
    		});
    	});
    }

    public async checkRoom(roomId: string) : Promise<boolean> {
    	return new Promise(resolve => {
    		if (!this._socket) return resolve(false);
    		console.log(GameEvents.CHECK_ROOM, roomId);
    		this._socket.emit(GameEvents.CHECK_ROOM, roomId, (flag: boolean) => {
    			resolve(flag);
    		});
    	});
    }

    public async joinRoom(roomId: string) : Promise<boolean> {
    	return new Promise(resolve => {
    		if (!this._socket) return resolve(false);
    		console.log(GameEvents.JOIN_ROOM, roomId);
    		this._socket.emit(GameEvents.JOIN_ROOM, roomId, (flag: boolean) => {
    			resolve(flag);
    		});
    	});
    }

    public become(becomePlayer: boolean) {
    	console.log(GameEvents.BECOME, becomePlayer);
    	this._socket?.emit(GameEvents.BECOME, becomePlayer, (flag: boolean) => {
    		if (flag) this._appDispatch(this._setIAmPlayerFlag(becomePlayer));
    	});
    }

    public leaveRoom() {
    	console.log(GameEvents.LEAVE_ROOM);
    	this._socket?.emit(GameEvents.LEAVE_ROOM, undefined);
    }

    public startGame(ownerKey: string) {
    	console.log(GameEvents.START_GAME, ownerKey);
    	this._socket?.emit(GameEvents.START_GAME, ownerKey);
    }

    public pauseGame(ownerKey: string) {
    	console.log(GameEvents.PAUSE_GAME, ownerKey);
    	this._socket?.emit(GameEvents.PAUSE_GAME, ownerKey);
    }

    public requestTimer() {
    	console.log(GameEvents.REQUEST_TIMER);
    	this._socket?.emit(GameEvents.REQUEST_TIMER);
    }

    public resumeGame(ownerKey: string) {
    	console.log(GameEvents.RESUME_GAME, ownerKey);
    	this._socket?.emit(GameEvents.RESUME_GAME, ownerKey);
    }

    public stopGame(ownerKey: string) {
    	console.log(GameEvents.STOP_GAME, ownerKey);
    	this._socket?.emit(GameEvents.STOP_GAME, ownerKey);
    }

    public async changeNickname(nickname: string) : Promise<string> {
    	return new Promise(resolve => {
    		if (!this._socket) return resolve('');
    		console.log(GameEvents.CHANGE_NICKNAME, nickname);
    		this._socket.emit(GameEvents.CHANGE_NICKNAME, nickname, (nickname: string) => {
    			if (nickname) {
    				this._appDispatch(this._setNickname(nickname));
    				localStorage.setItem('nickname', nickname);
    			}
    			resolve(nickname);
    		});
    	});
    }
}