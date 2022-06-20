import styles from '../../styles/ReviewEntry.module.css'

const ReviewEntry = ({data}) => {

	console.log('ReviewEntry')

  return (
	<div className={styles.entry}>
		<div className={styles.header}>
			<span className={styles.foo}>{data.user}</span>
			<span>a</span>
			{data.type === 'review' ? <span >VoteReview</span> : ''}
			{data.type === 'review' ? <span>{data.rating}</span> : '' }
		</div>
		<div className={styles.content}>
			  <p>{data.content}</p>
		</div>
	</div>

  )
}

export default ReviewEntry