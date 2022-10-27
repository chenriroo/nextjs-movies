import { useEffect, useState } from "react"
import styles from '../styles/MoviesListHorizontal.module.css'
import MovieEntryImage from "./MovieEntryImage"
import MovieDetail from "./MovieDetail"

const MoviesListHorizontal = ({title, movies, limit, posterSize, showDetail}) => {
	const [displayedMovies, setDisplayedMovies] = useState(movies)

	useEffect(() => {
		if(movies.length > limit) {
			setDisplayedMovies(movies.slice(0,limit))
		} else setDisplayedMovies(movies)
		
	console.log('useEffect')
	},[movies, limit])

	return (
		<section className={styles.moviesListHorizonal}>
			{title && <h2>{title}</h2>}
			<ul className={styles.listMovies}>
				{displayedMovies.map(movie => <MovieEntryImage
					key={`movie${movie.title}`}
					movie={movie}
					posterSize={posterSize}
					showDetail={showDetail}
				/>
				
				)}
			</ul>
		</section>
	)
}

export default MoviesListHorizontal