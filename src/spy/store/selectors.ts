import {RootState} from '../../store';
import {RoomOptions} from '../types/RoomOptions';
import {FieldCard} from '../types/FieldCard';
import {Sizes} from '../types/Sizes';
import {createSelector} from '@reduxjs/toolkit';
import {CardOptions} from '../types/CardOptions';
import {getGameSelectors} from '../../store/factories';
import {Player} from '../types/Player';

export const {selectOwnerKey, selectGameIsOnPause, selectIAmActing, selectIAmPlayer, selectTimer,
	selectMembers, selectMembersRestriction, selectRestrictionsToStart, selectPlayers, selectLogs,
	computeMembersRestriction, computePlayersAmongMembers, computeCurrentPlayer, computeLastLogs, selectRoomOptions,
	selectRoomMinPlayers, selectRoomMaxPlayers, selectRoomTitle} = getGameSelectors<'spy', Player, RoomOptions>('spy');

export const selectGameIsRunning = (state: RootState): boolean => state.spy.roomStatus === 'run';
export const selectOptionsOfCards = (state: RootState): CardOptions[] => state.spy.optionsOfCards;
export const selectRoomOptionSecondsToAct = (state: RootState): number => state.spy.roomOptions.secondsToAct;
export const selectRoomOptionWinScore = (state: RootState): number => state.spy.roomOptions.winScore;
export const selectRoomOptionColumns = (state: RootState): number => state.spy.roomOptions.columns;
export const selectRoomOptionRows = (state: RootState): number => state.spy.roomOptions.rows;
export const selectFieldCards = (state: RootState): FieldCard[] => state.spy.fieldCards;
export const selectSizes = (state: RootState): Sizes => state.spy.sizes;
export const selectCard = (state: RootState): FieldCard | undefined => state.spy.card;
export const selectLastWinner = (state: RootState): string => state.spy.lastWinner;
export const computeYourCardIndex = createSelector(
	[selectCard, selectFieldCards],
	(yourCard, cards) => {
		return yourCard ? cards.findIndex(card => card.id === yourCard.id) : -1;
	}
);