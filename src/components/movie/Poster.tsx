import styles from './Poster.module.css'
import Image from 'next/image'

const Poster = ({ movieData }) => {
  return (
	<div>
		<Image
			src={movieData.imgPoster}
			alt={movieData.title}
			className={styles.imgPoster}
			layout='fixed'
			width={240}
			height={350}
		/>
		<span className={styles.imgPosterOverlay}></span>
	</div>
  )
}

export default Poster