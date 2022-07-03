import React, {useCallback, useMemo, useState} from 'react';

import styles from './SideBar.module.scss';

type Props = {
	className?: string
	maxShowWidth: number
	miniBar?: React.ReactNode
	children?: React.ReactNode
	rightSide?: boolean
}

const SideBar: React.FC<Props> = ({className, maxShowWidth, miniBar, children, rightSide}) => {
	const [mini, setMini] = useState(window.screen.width < maxShowWidth);
	const layoutClass = useMemo(() => {
		return [className, styles.layout, (mini ? styles.miniLayout : '')].join(' ');
	}, [mini]);
	const buttonClass = useMemo(() => {
		return [styles.button, (mini ? styles.hiddenButton : ''), (rightSide ? styles.buttonToLeft : styles.buttonToRight)].join(' ');
	}, [mini]);
	const clickHandler = useCallback(() => {
		setMini(!mini);
	}, [mini]);
	return(<div className={layoutClass}>
		<button className={buttonClass} onClick={clickHandler}/>
		{mini ? miniBar : children}
	</div>);
};

export default SideBar;