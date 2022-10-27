import styles from './RadioButton.module.css'

const RadioButton = ({ name, checked, handleInput }) => {

	return (
	<>
		<input className={styles.radio} type="radio" value={name.toLowerCase()} checked={checked} onChange={handleInput}/>
		<label>
			<span>{name}</span>
		</label>
	</>

	)
}

export default RadioButton