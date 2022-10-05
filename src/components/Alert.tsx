import styles from './Alert.module.css'

const Alert = ({text, type}) => {

	return (
		<div 
		className={[
			styles.alert, 
			type === 'cover' && styles.cover,
			type === 'popup' && styles.popup
		].join(' ')}
		>
			<span>{text}</span>
		</div>
	)


}

export default Alert


