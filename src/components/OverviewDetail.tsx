import styles from '../styles/OverviewDetail.module.css'

const OverviewDetail = ({movie}) => {
	
	return (
		<div className={styles.overviewDetail}>
			<div className={styles.image}>image</div>
			<div className={styles.info}>
				<span>The Batman</span>
				<span>2022</span>
				<span>Genre: Action</span>
			</div>
		</div>
	)
}

export default OverviewDetail