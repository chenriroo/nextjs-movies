import { useState } from 'react'
import styles from './ReviewSection.module.css'

import Pagination from '../Pagination'
import ReviewList from './ReviewList'

const ReviewSection = ({reviews}) => {
	const [type, setType] = useState('reviews');

	function handleToggle(e) {
		setType(e.target.value);
	}
	
	return (
	<div>
		<div className={styles.toolbar}>
			<button value='reviews' onClick={handleToggle}>Reviews</button>
			<button value='comments' onClick={handleToggle}>Comments</button>

			<Pagination />
		</div>

		<ReviewList reviews={reviews} />

	</div>
  )
}

export default ReviewSection