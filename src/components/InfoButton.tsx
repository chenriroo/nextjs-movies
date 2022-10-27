import styles from './InfoButton.module.css'



interface InfoButtonProps {
	text:string,
	type?:string,
	canDelete: boolean,
	callback?: Function
}

const InfoButton = ({text,type, canDelete, callback}:InfoButtonProps) => {

	function handleClick() {
		if(!canDelete) return
		callback(text,type)
	}

	return (
		<span 
		className={`
		${styles.infoButton}
		${canDelete && styles.clickable }
		`}
		onClick={handleClick}
		>
			{ canDelete && <span className={styles.delete}>X</span>}
			<span>{text}</span>
		</span>
  )
}

export default InfoButton