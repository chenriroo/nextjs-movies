import Head from "next/head"
import styles from '../../styles/Movies.module.css'
import { useState, useEffect, useReducer } from "react"
import TopMenu from "../../components/TopMenu"
import MoviesSort from "../../components/MoviesSort"
import MoviesFilterSide from "../../components/MoviesFilterSide"
import SingleLine from "../../components/lists/SingleLine"
import Layout from "../../components/Layout"
import useSWRInfinite from "swr"
import InfoButton from "../../components/InfoButton"
import { takeCoverage } from "v8"

const fetcher = url => fetch(url).then(r => r.json())

function helperReducer(arrState, action) {
	let arr = arrState;
	if(action.payload.checked) {
		arr.push(action.payload.value)
	} else {
		arr = arr.filter(el => el !== action.payload.value)
	}
	return arr 
}

function helperQuery(arr,type) {
	let output
	if(arr.length > 1) {
		output = arr.map(el => el).join('+')
		return `${type}=${output}`
	} else if(arr.length === 1) {
		return `${type}=${arr[0]}`
	} else {
		return ''
	}
}

function reducer(state, action) {
	let arr
	switch(action.type) {
		case "title":
			arr = helperReducer(state.title, action)
			return {
				...state,
				title: arr
			};
		case "genre":
			arr = helperReducer(state.genre, action)
			return {
				...state,
				genre: arr
			};
		case "rating":
			arr = helperReducer(state.rating, action)
			return {
				...state,
				rating: arr
			};
		case "decade":
			arr = helperReducer(state.decade, action)
			return {
				...state,
				decade: arr
			};
		default:
			return state;
	}
}

const initialState = {
	title: '',
	genre: [],
	rating: [],
	decade: []
}

const Movies = () => {
	const [displayCovers, setDisplayCover] = useState(true);
	const [state, dispatch] = useReducer(reducer, initialState);

	const urlGenre = helperQuery(state.genre, 'genre')
	const urlRating = helperQuery(state.rating, 'rating')
	const urlDecade = helperQuery(state.decade, 'decade')

	const url = `/api/movies?${urlGenre}&${urlRating}&${urlDecade}`
	const { data: searchData, error: searchError } = useSWRInfinite(url, fetcher);

	console.log(url)

	function handleFilters(data) {
		const filterType = data.entry.split('-')[0];

		dispatch({
			type: filterType,
			payload: {
				checked: data.checked, 
				value: data.entry.split('-')[1]
			}
		})
	}

	function deleteFilter(tag,type) {
		dispatch({
			type: type,
			payload: {
				checked: false,
				value: tag
			}
		})
	}
	
	// Placeholder data
	const movies = [
		{
			title: 'Alien',
			genre: ['sciencefiction','horror'],
			year: 1979,
			rating: 8,
			description: 'During its return to the earth, commercial spaceship Nostromo intercepts a distress signal from a distant planet. When a three-member team of the crew discovers a chamber containing thousands of eggs on the planet, a creature inside one of the eggs attacks an explorer. The entire crew is unaware of the impending nightmare set to descend upon them when the alien parasite planted inside its unfortunate host is birthed.'
		},
		{
			title: 'Blue is the Warmest Color',
			genre: ['drama','romance'],
			year: 2010,
			rating: 8,
			description: 'Adèle’s life is changed when she meets Emma, a young woman with blue hair, who will allow her to discover desire, to assert herself as a woman and as an adult. In front of others, Adele grows, seeks herself, loses herself, finds herself.'
		},
		{
			title: 'Heat',
			genre: ['drama','action', 'thriller'],
			year: 1995,
			rating: 8,
			description: 'Obsessive master thief, Neil McCauley leads a top-notch crew on various daring heists throughout Los Angeles while determined detective, Vincent Hanna pursues him without rest. Each man recognizes and respects the ability and the dedication of the other even though they are aware their cat-and-mouse game may end in violence.'
		},
		{
			title: 'Toy Story 3',
			genre: ['comedy','animation'],
			year: 2018,
			rating: 8,
			description: 'Woody, Buzz, and the rest of Andy’s toys haven’t been played with in years. With Andy about to go to college, the gang find themselves accidentally left at a nefarious day care center. The toys must band together to escape and return home to Andy.'
		},
		{
			title: 'Leon the Professional',
			genre: ['action','drama'],
			year: 1994,
			rating: 8,
			description: 'Léon, the top hit man in New York, has earned a rep as an effective “cleaner”. But when his next-door neighbors are wiped out by a loose-cannon DEA agent, he becomes the unwilling custodian of 12-year-old Mathilda. Before long, Mathilda’s thoughts turn to revenge, and she considers following in Léon’s footsteps.'
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
						
						<span>Active filters</span>
						
						<div className={styles.activeFilters}>
							{ state.genre.map((entry, i) => { 
								return <InfoButton key={`genre-${i}`} 
									text={entry} 
									type='genre'
									canDelete={true}
									callback={deleteFilter}/> })
							}
							{ state.rating.map((entry, i) => {
								 return <InfoButton key={`rating-${i}`} 
									text={entry}
									type='rating' 
									canDelete={true}
									callback={deleteFilter}/> 
									})
							}
							{ state.decade.map((entry, i) => {
								return <InfoButton 
									key={`decade-${i}`} 
									text={entry}
									type='decade' 
									canDelete={true}
									callback={deleteFilter}/>})
							}
						</div>
						
						<MoviesFilterSide name='Genre' options={genres} handleFilters={handleFilters} state={state.genre} />
						<MoviesFilterSide name='Rating' options={rating} handleFilters={handleFilters} state={state.rating}/>
						<MoviesFilterSide name='Decade' options={decades} handleFilters={handleFilters} state={state.decade}/>
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