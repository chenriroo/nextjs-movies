import ReviewEntry from "./ReviewEntry"

const ReviewList = ({reviews}) => {
	return (
	<div>
		{reviews.map((review, id) => <ReviewEntry 
		key={`review-${id}`}
		data={review} />)}
	</div>
	)
}

export default ReviewList