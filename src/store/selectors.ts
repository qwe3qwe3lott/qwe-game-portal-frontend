import {RootState} from './index';
import {RoomOptions} from '../types/RoomOptions';
import {FieldCard} from '../types/FieldCard';
import {Sizes} from '../types/Sizes';
import {createSelector} from '@reduxjs/toolkit';
import {MembersRestriction} from '../types/MembersRestriction';
import {Member} from '../types/Member';

export const selectRoomOptionSecondsToAct = (state: RootState): number => state.spy.roomOptions.secondsToAct;
export const selectRoomOptionWinScore = (state: RootState): number => state.spy.roomOptions.winScore;
export const selectRoomOptionColumns = (state: RootState): number => state.spy.roomOptions.columns;
export const selectRoomOptionRows = (state: RootState): number => state.spy.roomOptions.rows;
export const selectRoomMinPlayers = (state: RootState): number => state.spy.roomOptions.minPlayers;
export const selectRoomMaxPlayers = (state: RootState): number => state.spy.roomOptions.maxPlayers;
export const selectRoomOptions = (state: RootState): RoomOptions => state.spy.roomOptions;
export const selectGameIsRunning = (state: RootState): boolean => state.spy.isRunning;
export const selectOwnerKey = (state: RootState): string => state.spy.ownerKey;
export const selectFieldCards = (state: RootState): FieldCard[] => state.spy.fieldCards;
export const selectSizes = (state: RootState): Sizes => state.spy.sizes;
export const selectIAmActing = (state: RootState): boolean => state.spy.iAmActing;
export const selectCard = (state: RootState): FieldCard | undefined => state.spy.card;
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