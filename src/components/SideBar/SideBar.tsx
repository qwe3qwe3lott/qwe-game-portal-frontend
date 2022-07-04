import React, {useState} from 'react';

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
	const layoutClass = [className, styles.layout, (mini ? styles.miniLayout : '')].join(' ');
	const buttonClass = [styles.button, (mini ? styles.hiddenButton : styles.showedButton), (rightSide ? styles.buttonToLeft : styles.buttonToRight)].join(' ');
	const clickHandler = () => setMini(!mini);
	return(<div className={layoutClass}>
		<button className={buttonClass} onClick={clickHandler}/>
		{mini ? miniBar : children}
	</div>);
};

export default SideBar;