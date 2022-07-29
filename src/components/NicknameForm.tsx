import React from 'react';
import {selectNickname} from '../store';
import {GameApi} from '../abstracts/GameApi';
import {GamePlayer} from '../types/GamePlayer';
import {GameRoomOptions} from '../types/GameRoomOptions';
import TextForm from './TextForm';

type Props = {
    onSuccess: () => void
	api: GameApi<GamePlayer, string, GameRoomOptions>
}
const NicknameForm: React.FC<Props> = ({onSuccess, api}) => {
	const applyMethod = async (value: string) => {
		const nickname = await api.changeNickname(value);
		if (nickname) onSuccess();
	};
	return <TextForm applyMethod={applyMethod} valueSelector={selectNickname} minLength={3} maxLength={30} placeholder={'Введите ник...'}/>;
};

export default NicknameForm;