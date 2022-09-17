import styles from './Alert.module.css'
import { useEffect, useState } from 'react'

const Alert = ({text, position}) => {

	return (
		<div className={`${styles.alert} ${styles.cover} `}>
			<span>{text}</span>
		</div>
	)


}

export default Alert


