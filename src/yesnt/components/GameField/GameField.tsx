import React from 'react';
import styles from './GameField.module.scss';


type Props = {
	className?: string
}
const GameField: React.FC<Props> = ({className}) => {
	const layoutClass = `${styles.layout} ${className}`;
	return(<div className={layoutClass}>
		123
	</div>);
};

export default GameField;
