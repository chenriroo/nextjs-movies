import styles from './BlockVotes.module.css'

const BlockVotes = ({movie}) => {
	return (
		<div className={styles.container}>
			
			<div className={styles.block}>
				Score breakdown
			</div>

			<div className={styles.block}>
				Score distribution
			</div>

			<div className={styles.block}>
				Score history
			</div>

		</div>
	)
}

export default BlockVotes