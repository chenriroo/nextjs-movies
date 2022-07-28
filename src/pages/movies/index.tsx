import Head from "next/head"
import styles from '../../styles/Movies.module.css'
import { useState, useEffect } from "react"
import TopMenu from "../../components/TopMenu"
import MoviesSort from "../../components/MoviesSort"
import MoviesFilterSide from "../../components/MoviesFilterSide"
import SingleLine from "../../components/lists/SingleLine"
import Layout from "../../components/Layout"
import useSWR from "swr"

const Movies = () => {
	const [displayCovers, setDisplayCover] = useState(true);
	const { data, error } = useSWR('');
	const [filters, setFilters] = useState([]);

	const movies = [
		{
			title: 'Alien',
			genre: ['sciencefiction','horror'],
			year: 1979,
			rating: 8,
		},
		{
			title: 'Alien',
			genre: ['sciencefiction','horror'],
			year: 1979,
			rating: 8,
		},
		{
			title: 'Alien',
			genre: ['sciencefiction','horror'],
			year: 1979,
			rating: 8,
		},

	];

	// Later we should retrieve all available genres from existing movies in the database
	const genres = ['action','animation', 'comedy','drama','fantasy','horror','romance','sciencefiction','thriller','war']
	const rating = ['1','2','3','4','5']
	const decades = ['70s','80s','90s','00s','10s','20s']

	return (
		<>
			<Head>
				<title>Movies</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<TopMenu />

			<div className={styles.containerContent}>

				<div className={styles.contentWrap}>


					<section id={styles.filterSide}>
						<span>Filters applied:</span>
						
						<MoviesFilterSide name='Genre' options={genres}  />
						<MoviesFilterSide name='Rating' options={rating}  />
						<MoviesFilterSide name='Decade' options={decades}  />
					</section>

					<section id={styles.filterTop}>
						<MoviesSort />
					</section>
				
					<section id={styles.movieItems}>
						<SingleLine data={movies} type='detail' />

					</section>



				</div>
			</div>



		</>
	)
}

export default Movies