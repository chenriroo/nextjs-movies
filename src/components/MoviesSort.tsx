import styles from './MoviesSort.module.css'

const MoviesSort = ({state, activeSort, callBack}) => {

	function buttonClick(button) {
		callBack(button)
	}

	return (
		<div className={styles.container}>
			<button
			disabled={state.decade.length > 0 || state.title !== ''  ? true : false}
			className={`button-alt ${activeSort === 'recent' ? 'button-alt-active' : ''}`}
			onClick={() => buttonClick('recent')}>
				Recent
			</button>
			<button
			disabled={state.title !== '' ? true : false}
			className={`button-alt ${activeSort === 'top-rated' ? 'button-alt-active' : ''}`}
			onClick={() => buttonClick('top-rated')}>
				Top Rated
			</button>

			<button
			disabled={state.decade.length > 0 || state.title !== '' ? true : false}
			className={`button-alt ${activeSort === 'upcoming' ? 'button-alt-active' : ''}`}
			onClick={() => buttonClick('upcoming')}>
				Upcoming
			</button>
		</div>
	)
}

export default MoviesSort