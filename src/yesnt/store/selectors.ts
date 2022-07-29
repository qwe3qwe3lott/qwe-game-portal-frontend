import {getGameSelectors} from '../../store/factories';
import {Player} from '../types/Player';
import {RoomOptions} from '../types/RoomOptions';
import {RootState} from '../../store';
import {Result} from '../types/Result';
import {createSelector} from '@reduxjs/toolkit';


export const {selectOwnerKey, selectGameIsOnPause, selectIAmActing, selectIAmPlayer, selectTimer,
	selectMembers, selectMembersRestriction, selectRestrictionsToStart, selectPlayers, selectLogs,
	computeMembersRestriction, computePlayersAmongMembers, computeCurrentPlayer, computeLastLogs, selectRoomOptions,
	selectRoomMaxPlayers, selectRoomMinPlayers, selectRoomTitle} = getGameSelectors<'yesnt', Player, RoomOptions>('yesnt');

export const selectGameIsRunning = (state: RootState): boolean => state.yesnt.roomStatus === 'ask' || state.yesnt.roomStatus === 'answer';
export const selectGameIsOnAsking = (state: RootState): boolean => state.yesnt.roomStatus === 'ask';
export const selectGameIsOnAnswering = (state: RootState): boolean => state.yesnt.roomStatus === 'answer';
export const selectQuestion = (state: RootState): string => state.yesnt.question;
export const selectAnswer = (state: RootState): string | undefined => state.yesnt.answer;
export const selectCountOfAnswers = (state: RootState): number => state.yesnt.countOfAnswers;
export const selectResult = (state: RootState): Result | undefined => state.yesnt.result;
export const selectRoomOptionsSecondsToAsk = (state: RootState): number => state.yesnt.roomOptions.secondsToAsk;
export const selectRoomOptionsSecondsToAnswer = (state: RootState): number => state.yesnt.roomOptions.secondsToAnswer;

export const computeAnsweringInfo = createSelector(
	[selectCountOfAnswers, selectPlayers],
	(countOfAnswers, players) => {
		return `Ответили ${countOfAnswers} из ${players.length} игроков`;
	}
);
