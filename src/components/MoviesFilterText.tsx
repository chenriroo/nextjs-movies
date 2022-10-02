import { useState } from "react"
import Alert from "./Alert"
import styles from "./MoviesFilterSide.module.css"

const MoviesFilterText = ({name, callback, state}) => {
	const [displayAlert, setAlert] = useState(false);
	const [filterIsActive, setFilterActive] = useState(false)

	function handleKeystroke(e) {
		const input = e.target.value;
		if(input.length > 4) {
			setFilterActive(true)
			callback(e.target.value)
		} else {
			setFilterActive(false)
			callback('')
		}
	}

	function handleButtonRemove() {
		callback('')
	}

	return (
		<div className={styles.section}>
			<div className={styles.header}>
			{displayAlert && <Alert 
			text={`Alert`}
			position='cover' />}
			<span className={styles.title}>{name}</span>
			</div>
			<div className={[styles.rowInput, filterIsActive ? styles.rowActive : ''].join(' ')}>
				<input type="text" className={styles.inputText} placeholder='Search title' onChange={handleKeystroke}></input>

				<button
				onClick={handleButtonRemove}
				className={[filterIsActive ? '' : styles.inactive, styles.btnTitle].join(' ')}
				>
					{filterIsActive ?
					'X'
					:
					'...'	
				}
				</button>

			</div>
		</div>
	)
}

export default MoviesFilterText