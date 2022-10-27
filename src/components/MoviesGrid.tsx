import styles from '../styles/MoviesGrid.module.css'
import MovieEntryImage from './MovieEntryImage'

const MoviesGrid = ({movies}) => {
  return (
		<li className={styles.moviesList}>
			{movies.map(movie => 
			<MovieEntryImage
			key={`movie-${movie.id}`}
			movie={movie}
			posterSize="small"
			showDetail={false}/>)}
		</li>
  )
}

export default MoviesGrid