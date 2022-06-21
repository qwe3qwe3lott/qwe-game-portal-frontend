import React, {useCallback, useMemo, useState} from 'react';
import MembersList from '../MembersList';
import MemberPanel from '../MemberPanel';
import OwnerPanel from '../OwnerPanel';
import {useAppSelector} from '../../../hooks/typedReduxHooks';

import styles from './OptionsBar.module.scss';
import {selectOwnerKey} from '../../store/selectors';

type Props = {
	className?: string
}

const OptionsBar: React.FC<Props> = ({className}) => {
	const ownerKey = useAppSelector(selectOwnerKey);
	const [hidden, setHidden] = useState(false);
	const layoutClass = useMemo(() => {
		return [className, styles.layout, (hidden ? styles.hiddenLayout : '')].join(' ');
	}, [hidden]);
	const clickHandler = useCallback(() => {
		setHidden(!hidden);
	}, [hidden]);
	return(<div className={layoutClass}>
		<button className={styles.button} onClick={clickHandler}>{'*'}</button>
		{hidden ? <>

		</> : <>
			{ownerKey && <OwnerPanel/>}
			<MemberPanel/>
			<MembersList/>
		</>}
	</div>);
};

export default OptionsBar;