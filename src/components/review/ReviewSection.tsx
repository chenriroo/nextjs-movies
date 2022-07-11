import { useState } from 'react'
import styles from './ReviewSection.module.css'

import Pagination from '../Pagination'
import ReviewList from './ReviewList'
import ReviewCreate from './ReviewCreate'
import useSWR from 'swr'

// const fetcher = url => fetch(url).then(r => r.json())

const ReviewSection = ({movieID, reviewData, isLoggedIn}) => {
	// const url = `/api/review?movie=${movieID}`
	// const { data, error } = useSWR(url,fetcher)
	const [type, setType] = useState('reviews');
	
	if(reviewData) {
		console.log(reviewData)
	}

	function handleToggle(e) {
		setType(e.target.value);
	}
	
	return (
	<div>
		<h1>{reviewData ? reviewData.foo : 'hiyaaa'}</h1>
		{isLoggedIn && <ReviewCreate movie={'...'} />}
		<div className={styles.toolbar}>
			<button value='reviews' onClick={handleToggle}>Reviews</button>
			<button value='comments' onClick={handleToggle}>Comments</button>

			<Pagination />
		</div>

		{reviewData ? <ReviewList reviews={reviewData.reviews} /> : <span>loader hiero</span>}

	</div>
  )
}

export default ReviewSection