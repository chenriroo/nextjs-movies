import { useState } from 'react'
import styles from './ReviewSection.module.css'

import Pagination from '../Pagination'
import ReviewList from './ReviewList'
import ReviewCreate from './ReviewCreate'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

const ReviewSection = ({reviews, isLoggedIn}) => {
	const url = '/api/review'
	const { data, error } = useSWR(url,fetcher)
	const [type, setType] = useState('reviews');
	
	console.log(reviews)

	if(data) {
		console.log(data.reviews)
	}

	function handleToggle(e) {
		setType(e.target.value);
	}
	
	return (
	<div>
		<h1>{data ? data.foo : 'hiyaaa'}</h1>
		{isLoggedIn && <ReviewCreate movie={'...'} />}
		<div className={styles.toolbar}>
			<button value='reviews' onClick={handleToggle}>Reviews</button>
			<button value='comments' onClick={handleToggle}>Comments</button>

			<Pagination />
		</div>

		{data ? <ReviewList reviews={data.reviews} /> : <span>loader hiero</span>}

	</div>
  )
}

export default ReviewSection