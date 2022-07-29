import React from 'react';
import {RootState} from '../store';
import {GameApi} from '../abstracts/GameApi';
import {GamePlayer} from '../types/GamePlayer';
import {GameRoomOptions} from '../types/GameRoomOptions';
import TextForm from './TextForm';
import {useAppSelector} from '../hooks/typedReduxHooks';

type Props = {
    onSuccess: () => void
	api: GameApi<GamePlayer, string, GameRoomOptions>
	selectRoomTitle: (state: RootState) => string
	selectOwnerKey: (state: RootState) => string
}
const NicknameForm: React.FC<Props> = ({onSuccess, api, selectRoomTitle, selectOwnerKey}) => {
	const ownerKey = useAppSelector(selectOwnerKey);
	const applyMethod = async (value: string) => {
		const flag = await api.renameRoom(ownerKey, value);
		if (flag) onSuccess();
	};
	return <TextForm applyMethod={applyMethod} valueSelector={selectRoomTitle} maxLength={30} minLength={3} placeholder={'Введите название...'}/>;
};

export default NicknameForm;