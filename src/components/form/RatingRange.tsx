
import styles from './RatingRange.module.css'

const RatingRange = ({ handleInput }) => {
  return (
	<div className={styles.rating}>
		<label htmlFor="range_input">
  			Rating:
		</label>
		<div className={styles.slider}>
			<input type="range"
			id="range_input"
			name="rating"
			min="0"
			max="100"
			step="10"
			defaultValue="0"
			onChange={handleInput}>
			</input>
		</div>

	</div>
  )
}

export default RatingRange