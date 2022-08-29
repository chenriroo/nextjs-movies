import { useState } from "react"
import styles from "./MoviesFilterSide.module.css"

const MoviesFilterSide = ({ name, options, handleFilters, state  }) => {
	const [isVisible, setVisibility] = useState(false)


	function toggleDisplay() {
		setVisibility(!isVisible)
	}

	function handleCheckbox(e) {
		const el = e.target;
		
		handleFilters({
			entry: `${name.toLowerCase()}-${el.name}`,
			checked: el.checked
		})
	}

	return (
	<div>
		<span className={styles.title} onClick={toggleDisplay}>{name}</span>
		{
			isVisible &&
			options.map(option => {
				return <li key={option} className={styles.option}>
				<input 
				type="checkbox" 
				name={option} 
				id={option} 
				onChange={handleCheckbox} 
				checked={state.includes(option)}
				/>
				<label htmlFor={option}>{option}</label>
				<span>10</span>
			</li> 
			})
		}
	</div>
	)
}

export default MoviesFilterSide