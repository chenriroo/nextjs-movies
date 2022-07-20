import { useEffect, useState } from 'react'
import styles from '../styles/Overview.module.css'
import OverviewFilter from './MoviesFilterTop'
import OverviewEntry from './OverviewEntry'
import OverviewDetail from './OverviewDetail'


const Overview = ({movies}) => {
	const [year, setYear] = useState('')
	const [genre, setGenre] = useState('')
	const [selectedMovie, setSelectedMovie] = useState('')


	useEffect(() => {
		//console.log('Overview: useEffect()', movies)
	},[movies])

	const movieHandler = (e,movie) => {
		console.log(e.target)
		console.log(movie)
	}

	return (
		<div className={styles.container}>
			
			
			<div className={styles.entryPopup}>
				<OverviewDetail movie={selectedMovie}/>
			</div>

			{/* <OverviewFilter className={styles.entriesList}/> */}


			<span>Latest reviews</span>
			<div className={styles.innerContainer}>
				<ul className={styles.entriesList}>
					{movies.map((movie) => <OverviewEntry key={movie.id} movie={movie} select={movieHandler}  />)}
				</ul>
			</div>

		</div>
	)
}

export default Overview