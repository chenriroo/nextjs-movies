import styles from './ItemMovieDetail.module.css'

const ItemMovieDetail = ({data}) => {

	return (
		<div className={styles.containerItem}>
			<div className={styles.poster}>
				
			</div>
			<div className={styles.detail} >
				<span>{data.title}</span>
				<span>{data.genre}</span>
				<span>Jul 14, 2020</span>
			</div>

		</div>
	)
}

export default ItemMovieDetail