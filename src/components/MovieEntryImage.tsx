import styles from '../styles/MovieEntryImage.module.css'
import Link from 'next/link'
import Image from 'next/image'
import MovieDetail from './MovieDetail'

const MovieEntryImage = ({movie, posterSize, showDetail}) => {
  return (
	<li className={`${styles.itemMovie} ${posterSize === 'large' && styles.itemMovie_Large}`}>
		<Link href={`/movie/${encodeURIComponent(movie.id)}`} passHref={true}>
			<a>
				<Image
				src={movie.imgPoster}
				alt={movie.title}
				layout='fill'
				className={styles.image}>
				</Image>
				<span className={styles.overlay}></span>
			</a>
		</Link>
		{showDetail && <MovieDetail />}
	</li>

  )
}

export default MovieEntryImage