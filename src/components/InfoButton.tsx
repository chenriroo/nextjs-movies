import styles from './InfoButton.module.css'

const InfoButton = ({text, canDelete}) => {
  return (
	<span className={styles.infoButton}>{text}</span>
  )
}

export default InfoButton