import styles from './MoviesFilterTop.module.css'
import Dropdown from './Dropdown'

const MoviesFilter = () => {

	const years = ["All", "Upcoming", "2020s", "2010s", "2000s", "1990s"]

	const genres = [
		"Action", "Animation", "Comedy", "Documentary", "Drama", "Fantasy", 
		"Horror", "Romance", "Science Fiction", "Thriller", "War"]

	return (
		<div className={styles.container}>

			<div className={styles.containerDropdown}>
				<Dropdown value="year" options={years}/>
				<Dropdown value="genre" options={genres}/>
			</div>


			
		</div>
	)
}

export default MoviesFilter