import {RootState} from '../../store';
import {RoomOptions} from '../types/RoomOptions';
import {FieldCard} from '../types/FieldCard';
import {Sizes} from '../types/Sizes';
import {createSelector} from '@reduxjs/toolkit';
import {MembersRestriction} from '../types/MembersRestriction';
import {Member} from '../types/Member';
import {LogRecord} from '../types/LogRecord';
import {Player} from '../types/Player';
import {Timer} from '../types/Timer';
import {RoomStatuses} from '../enums/RoomStatuses';
import {CardOptions} from '../types/CardOptions';

export const selectRoomOptionSecondsToAct = (state: RootState): number => state.spy.roomOptions.secondsToAct;
export const selectRoomOptionOptionsOfCards = (state: RootState): CardOptions[] => state.spy.roomOptions.optionsOfCards;
export const selectRoomOptionWinScore = (state: RootState): number => state.spy.roomOptions.winScore;
export const selectRoomOptionColumns = (state: RootState): number => state.spy.roomOptions.columns;
export const selectRoomOptionRows = (state: RootState): number => state.spy.roomOptions.rows;
export const selectRoomMinPlayers = (state: RootState): number => state.spy.roomOptions.minPlayers;
export const selectRoomMaxPlayers = (state: RootState): number => state.spy.roomOptions.maxPlayers;
export const selectRoomOptions = (state: RootState): RoomOptions => state.spy.roomOptions;
export const selectGameIsRunning = (state: RootState): boolean => state.spy.roomStatus === RoomStatuses.IS_RUNNING || state.spy.roomStatus === RoomStatuses.ON_PAUSE;
export const selectGameIsOnPause = (state: RootState): boolean => state.spy.roomStatus === RoomStatuses.ON_PAUSE;
export const selectOwnerKey = (state: RootState): string => state.spy.ownerKey;
export const selectFieldCards = (state: RootState): FieldCard[] => state.spy.fieldCards;
export const selectSizes = (state: RootState): Sizes => state.spy.sizes;
export const selectTimer = (state: RootState): Timer => state.spy.timer;
export const selectIAmActing = (state: RootState): boolean => state.spy.iAmActing;
export const selectIAmPlayer = (state: RootState): boolean => state.spy.iAmPlayer;
export const selectCard = (state: RootState): FieldCard | undefined => state.spy.card;
export const selectLogs = (state: RootState): LogRecord[] => state.spy.logs;
export const selectLastWinner = (state: RootState): string => state.spy.lastWinner;
export const selectPlayers = (state: RootState): Player[] => state.spy.players;
export const selectStartConditionFlag = (state: RootState): boolean => state.spy.startConditionFlag;
export const selectMembers = (state: RootState): Member[] => state.spy.members;
export const selectMembersRestriction = (state: RootState): MembersRestriction => state.spy.membersRestriction;
export const computePlayersAmongMembers = createSelector(
	[selectMembers],
	(members) => {
		return members.filter(member => member.isPlayer);
	}
);
export const computeMembersRestriction = createSelector(
	[computePlayersAmongMembers, selectMembersRestriction],
	(members, membersRestriction) => {
	    return `${members.length} из ${membersRestriction.min === membersRestriction.max ? membersRestriction.min : `${membersRestriction.min}-${membersRestriction.max}`}`;
	}
);
export const computeYourCardIndex = createSelector(
	[selectCard, selectFieldCards],
	(yourCard, cards) => {
		return yourCard ? cards.findIndex(card => card.id === yourCard.id) : -1;
	}
);
export const computeLastLogs = createSelector(
	[selectLogs],
	(logs) => {
		return logs.slice(0, Math.min(logs.length, 10));
	}
);
export const computeCurrentPlayer = createSelector(
	[selectPlayers],
	(players) => {
		return players.length > 0 ? players[0] : undefined;
	}
);