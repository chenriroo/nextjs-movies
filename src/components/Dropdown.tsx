import styles from '../styles/Dropdown.module.css'
import { useState } from 'react' 

const Dropdown = ({value, options}) => {
	const [activeOption, setOption] = useState(value)


	console.log(activeOption)

	return (
		<li className={styles.dropdown}>
			<button
			type="button"
			className={styles.dropdownTitle}
			aria-expanded="false"
			aria-controls={value}>
				{activeOption}
			</button>
			<ul className={styles.dropdownMenu} id={value}>
				<li>{value}</li>
				{options.map((option, i) => (
					<li 
					key={`${option}${i}`} 
					className={styles.option}
					onClick={() => setOption(option)}>
						{option}
					</li>
				))}
			</ul>
		</li>
		
	)
}

export default Dropdown