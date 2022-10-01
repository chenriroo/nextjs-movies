import { useState } from "react"
import Alert from "./Alert"
import styles from "./MoviesFilterSide.module.css"

const MoviesFilterText = ({name, callback, state}) => {
	const [displayAlert, setAlert] = useState(false)

	function handleKeystroke(e) {
		const input = e.target.value;
		callback(input)
	}

	return (
		<div className={styles.section}>
			<div className={styles.header}>
			{displayAlert && <Alert 
			text={`Alert`}
			position='cover' />}
			<span className={styles.title}>{name}</span>
			</div>
			<input type="text" className={styles.inputText} placeholder='Search title' onChange={handleKeystroke}>

			</input>
		</div>
	)
}

export default MoviesFilterText