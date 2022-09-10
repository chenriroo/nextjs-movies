import { useState } from "react"
import styles from "./MoviesFilterSide.module.css"

const MoviesFilterSide = ({ name, options, handleFilters, state  }) => {
	const [isVisible, setVisibility] = useState(false)

	const optionInactive  = options.filter(option => {
		if(!state.includes(option)){
			return option
		}
	})

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
	<div className={styles.section}>
		<div className={styles.header} onClick={toggleDisplay} >
			<span className={styles.title} >{name}</span>
			<span className={`${styles.chevron} ${isVisible && styles.chevronDown} `}></span>
		</div>
		{
			state.map(option => {
				return <li key={option} className={styles.option}>
				<input 
				type="checkbox" 
				name={option} 
				id={option} 
				onChange={handleCheckbox} 
				checked={state.includes(option)}
				/>
				<label htmlFor={option}>{option}</label>
				{/* <span className={styles.foo}>10</span> */}
			</li> 
			})
		}
		{
			isVisible &&
			optionInactive.map(option => {
				return <li key={option} className={styles.option}>
				<input 
				type="checkbox" 
				name={option} 
				id={option} 
				onChange={handleCheckbox} 
				checked={state.includes(option)}
				/>
				<label htmlFor={option}>{option}</label>
				{/* <span className={styles.foo}>10</span> */}
			</li> 
			})
		}
	</div>
	)
}

export default MoviesFilterSide