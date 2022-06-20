import styles from '../styles/MovieEntry.module.css'
import Link from 'next/link'

const MovieEntry = ({movie, flexFlow}) => {

	return (
		<li className={styles.itemMovie}>
			<Link href={`/movie/${movie.slug}`} passHref={true}>
				{movie.title}
			</Link>
		</li>

	)
}

export default MovieEntry