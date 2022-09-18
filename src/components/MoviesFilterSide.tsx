import { useEffect, useState } from "react"
import Alert from "./Alert";
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
		if(state.length === activeLimit) {
			setLimitReached(true)
		} else {
			setLimitReached(false)
			setDisplayLimitReached(false)
		}
	},[state.length, activeLimit])

	useEffect(() => {
		if(displayLimitReached === true) {
			setTimeout(() => {
				setDisplayLimitReached(false);
			},2000)
		} else return
	})

	function toggleDisplay() {
		setVisibility(!isVisible)
	}

	function handleCheckbox(e) {
		const el = e.target;
		if(limitReached) {
			if(state.includes(el.name)) {
				handleFilters({
					entry: `${name.toLowerCase()}-${el.name}`,
					checked: el.checked
				})
				return
			} else {
				setDisplayLimitReached(true)
				return
			}
		} else {
			if(!limitReached) {
				handleFilters({
					entry: `${name.toLowerCase()}-${el.name}`,
					checked: el.checked
				})
			}	
		}	
	}

	return (
	<div className={styles.section}>
		<div className={styles.header} onClick={toggleDisplay}>
			{displayLimitReached && <Alert 
			text={`Limit: ${activeLimit}`}
			position='cover' />}
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