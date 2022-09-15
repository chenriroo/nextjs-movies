import { useEffect, useState } from "react"
import styles from "./MoviesFilterSide.module.css"

const MoviesFilterSide = ({ name, options, handleFilters, state, activeLimit  }) => {
	const [isVisible, setVisibility] = useState(false);
	const [limitReached, setLimitReached] = useState(false);
	const [displayLimitReached, setDisplayLimitReached] = useState(false);
	let optionsInactive
	
	optionsInactive  = options.filter(option => {
		if(!state.includes(option)){
			return option
		}
	})

	useEffect(() => {
		console.log(state.length, activeLimit)
		if(state.length === activeLimit) {
			setLimitReached(true) 
		} else {
			setLimitReached(false)
			setDisplayLimitReached(false)
		}
	},[state.length, activeLimit])

	function toggleDisplay() {
		setVisibility(!isVisible)
	}

	function handleCheckbox(e) {
		if(limitReached) {
			setDisplayLimitReached(true)
			return
		}
		const el = e.target;
		if(!limitReached) {
			handleFilters({
				entry: `${name.toLowerCase()}-${el.name}`,
				checked: el.checked
			})
		}

	}

	return (
	<div className={styles.section}>
		<div className={styles.header} onClick={toggleDisplay} >
			{displayLimitReached && <div>asdfsdf</div>}
			<span className={styles.title} >{name}</span>
			<span className={`${styles.chevron} ${isVisible && styles.chevronDown}`}></span>
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
			optionsInactive.map(option => {
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