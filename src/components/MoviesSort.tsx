import styles from './MoviesSort.module.css'

const MoviesSort = ({activeSort, callBack}) => {

	function buttonClick(button) {
		callBack(button)
	}

	return (
		<div className={styles.container}>
			<button
			className={activeSort === 'recent' ? 'buttonActive' : ''}
			onClick={() => buttonClick('recent')}>
				Recent
			</button>

			<button
			className={activeSort ==='top-rated' ? 'buttonActive' : '' }
			onClick={() => buttonClick('top-rated')}>
				Top Rated
			</button>

			<button
			className={activeSort ==='upcoming' ? 'buttonActive' : '' }
			onClick={() => buttonClick('upcoming')}>
				Upcoming
			</button>
		</div>
	)
}

export default MoviesSort