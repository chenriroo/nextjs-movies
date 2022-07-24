import styles from "./MoviesFilterSide.module.css"

const MoviesFilterSide = ({ name, options  }) => {
  return (
	<div>
		<span className={styles.title}>{name}</span>

		{
			options.map(option =>
			<li key={option} className={styles.option}>
				<input type="checkbox" name={option} id={option} />
				<label htmlFor={option}>{option}</label>
				<span>10</span>
			</li> )
		}

	</div>
  )
}

export default MoviesFilterSide