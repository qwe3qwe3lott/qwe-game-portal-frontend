import React from 'react';
import MembersList from '../MembersList';
import MemberPanel from '../MemberPanel';
import OwnerPanel from '../OwnerPanel';
import {useAppSelector} from '../../hooks/typedReduxHooks';

import styles from './OptionsBar.module.scss';

type Props = {
	className?: string
}

const OptionsBar: React.FC<Props> = ({className}) => {
	const ownerKey = useAppSelector(state => state.spy.ownerKey);

	return(<div className={[className, styles.layout].join(' ')}>
		{ownerKey && <OwnerPanel/>}
		<MemberPanel/>
		<MembersList/>
	</div>);
};

export default OptionsBar;