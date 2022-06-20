import styles from '../../styles/Infoblock.module.css'

const MainMovie = ({movie}) => {



  return (
	<div className={styles.infoBlock}>
		<h4 className={styles.h4_filmInfo}><span>Releasedate</span></h4>
		<div className={styles.infoGenre}>
			<span className={styles.infoBox}>placeholder</span>
		</div>
		  <h4 className={styles.h4_filmInfo}><span>Country</span></h4>
		<div className={styles.infoGenre}>
			<span className={styles.infoBox}>placeholder</span>
		</div>
		  <h4 className={styles.h4_filmInfo}><span>Genres</span></h4>
		<div className={styles.infoGenre}>
			{movie.genre.map((genre, i) => (<span key={`genre${i}`} className={styles.infoBox}>{genre}</span>))}
		</div>
		
	</div>
  )
}

export default MainMovie