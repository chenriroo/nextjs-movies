import { useState } from 'react'
import styles from '../styles/Hero.module.css'
import MoviesListHorizontal from './MoviesListHorizontal'

const Hero = ({movies}) => {
	const [activeMovie, setActiveMovie] = useState('')

	return (
		<div className={styles.container}>

			<MoviesListHorizontal
			title="Recently popular"
			movies={movies}
			limit={4}
			posterSize='large'
			showDetail={true}
			/>
			
		</div>
	)
}

export default Hero