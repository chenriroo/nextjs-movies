import Head from "next/head"
import styles from '../../styles/Movies.module.css'
import { useState, useEffect, useReducer } from "react"
import TopMenu from "../../components/TopMenu"
import MoviesSort from "../../components/MoviesSort"
import MoviesFilterCheckboxGroup from "../../components/MoviesFilterCheckboxGroup"
import MoviesFilterText from "../../components/MoviesFilterText"
import MoviesResults from "../../components/MoviesResults"
import SingleLine from "../../components/lists/SingleLine"
import Layout from "../../components/Layout"
import useSWR from "swr"
import InfoButton from "../../components/InfoButton"
import { takeCoverage } from "v8"
import { off } from "process"

const fetcher = url => fetch(url).then(r => r.json())

// filter On / Off
function helperReducer(arrState, action) {
		let arr = arrState;

		if(action.payload.checked) {
			arr.push(action.payload.value)
		} else {
			arr = arr.filter(el => el !== action.payload.value)
		}
		return arr 
}

function generateAPIURL(state,pageIndex) {
	let urlGenre, urlDecade, url
	const keys = Object.keys(state)
	let arr = []

	keys.forEach((key) => {
		let output
		if(typeof state[key] === 'string') {
			output = state[key].length >= 4 ? state[key] : undefined
		} else if(Array.isArray(state[key])) {
			output = state[key].length > 1 ? state[key].map(el => el).join('+') : state[key][0]
		}
		if(output) arr.push(`${key}=${output}`)
	})

	if(arr.length > 1) {
		let foo = arr.map((el) => el).join('&')
		url = `/api/movies?${foo}&page=${pageIndex}`
	} else if(arr.length === 1) {
		url = `/api/movies?${arr[0]}&page=${pageIndex}`
	} else {
		url = `/api/movies?page=${pageIndex}`
	}



	console.log(url)

	return url
}

function reducer(state, action) {
	let arr
	switch(action.type) {
		case "title":
			return {
				...state,
				title: action.payload.value
			};
		case "genre":
			arr = helperReducer(state.genre, action)
			return {
				...state,
				genre: arr
			};
		case "decade":
			arr = helperReducer(state.decade, action)
			return {
				...state,
				decade: arr
			};
		case "sort":
			let foo
			if(state.sort === action.payload.value) {
				foo = ''
			} else {
				foo = action.payload.value
			}
			return {
				...state,
				sort: foo
			};
		default:
			return state;
	}
}

const initialState = {
	title: '',
	genre: [],
	decade: [],
	sort: '',
}

const Movies = () => {
	const [pageIndex, setPageIndex] = useState(0);
	const [displayCovers, setDisplayCover] = useState(true);
	const [state, dispatch] = useReducer(reducer, initialState);
	const { data: searchData, error: searchError } = useSWR(`${generateAPIURL(state, pageIndex)}`, fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	});


	console.log(searchData)

	//console.log({state, searchData})

	// Rename... for checkbox input only
	function handleFilters(data) {
		let entrySanitized = data.entry;
		if(data.type === 'decade') entrySanitized = data.entry.slice(0,4)

		dispatch({
			type: data.type,
			payload: {
				checked: data.checked, 
				value: data.entry,
				valueAPI: entrySanitized
			}
		})
	}

	function handleSearchTitle(inputString) {
		
		dispatch({
			type: 'title',
			payload: {
				value: inputString
			}
		})
	}

	function handleSortInput(button) {
		dispatch({
			type: 'sort',
			payload: {
				value: button
			}
		})
	}

	function loadMoreData() {
		setPageIndex(pageIndex + 1)
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

	// Later we should retrieve all available genres from existing movies in the database
	const genres = ['action','animation', 'comedy','drama','fantasy','horror','romance','sciencefiction','thriller','war']
	const decades = ['1970s','1980s','1990s','2000s','2010s','2020s']

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
							{ state.decade.map((entry, i) => {
								return <InfoButton 
									key={`decade-${i}`} 
									text={entry}
									type='decade' 
									canDelete={true}
									callback={deleteFilter}/>})
							}
						</div>
						
						<MoviesFilterText 
							name='Title'  
							callback={handleSearchTitle} 
							state={state.title}
							isDisabled={
								state.decade.length > 0 || 
								state.genre.length > 0 || 
								state.sort !== '' ? true : false}
							/>
						<MoviesFilterCheckboxGroup
							name='Genre'
							options={genres}
							handleFilters={handleFilters}
							state={state.genre}
							activeLimit={3}
							isDisabled={state.title !== '' ? true : false}/>
						<MoviesFilterCheckboxGroup 
							name='Decade' 
							options={decades} 
							handleFilters={handleFilters} 
							state={state.decade} 
							activeLimit={1} 
							isDisabled={
								state.sort === 'recent' || 
								state.sort === 'upcoming' ||
								state.title !== '' ? true : false
								}
							/>
					</section>
					
					<section id={styles.right}>
						<div id={styles.filterTop}>
							<MoviesSort state={state} activeSort={state.sort} callBack={handleSortInput}/>
						</div>
					
						<div id={styles.movieItems}>

							<MoviesResults index={pageIndex} data={searchData} sort={state.sort} />
							<button onClick={loadMoreData}>More</button>
						</div>
					</section>



				</div>
			</div>



		</>
	)
}

export default Movies