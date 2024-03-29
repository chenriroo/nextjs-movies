import { useEffect, useState } from "react"
import Alert from "./Alert"
import styles from "./MoviesFilterCheckboxGroup.module.css"

const MoviesFilterText = ({name, callback, state, isDisabled}) => {
	const [displayAlert, setAlert] = useState(false);
	const [filterIsActive, setFilterActive] = useState(false)
	const [input, setInput] = useState('');

	function handleInput(e) {
		setInput(e.target.value);

		if(e.target.value.length >= 4) {
			setFilterActive(true)
			callback(e.target.value);
		} else if(e.target.value.length < 4 && filterIsActive === true){
			setFilterActive(false);
			callback('')
		}
	}

	function handleButtonRemove() {
		setInput('');
		callback('');
		setFilterActive(false);
		
	}

	function handleMouseEnter() {
		if(filterIsActive) return
		setAlert(true)
	}

	function handleMouseLeave() {
		if(filterIsActive) return
		setAlert(false)
	}


	return (
		<div className={styles.section}>
			<div className={styles.header}>

			<span className={styles.title}>{name}</span>
			</div>
			<div className={[styles.rowInput, filterIsActive ? styles.rowActive : ''].join(' ')}>
				<input 
				type="text" 
				className={styles.inputText} 
				placeholder='Search title' 
				value={input}
				onChange={handleInput}
				disabled={isDisabled}
				/>
				<button
				onClick={handleButtonRemove}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className={[filterIsActive ? '' : styles.inactive, styles.btnTitle].join(' ')}
				>
					{filterIsActive ?
					'X'
					:
					'...'
				}
				</button>
				{displayAlert && <Alert 
				text={isDisabled ? `Inactive when filtering decade/genre` : `4 characters minimum`}
				type='popup' />}

			</div>
		</div>
	)
}
export default MoviesFilterText