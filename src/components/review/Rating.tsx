import styles from '../../styles/Rating.module.css'
import fadeTransition from '../../styles/transitions/fade.module.css'
import { useState } from 'react'
import Chart from './Chart';
import CircleRating from '../rating/CircleRating';
import { CSSTransition } from 'react-transition-group'


const sortRatings = (ratings) => {

	let arrSorted = [0,0,0,0,0,0,0,0,0,0,0]
	ratings.forEach(rating => {
		switch(rating) {
			case 0:
				arrSorted[0] += 1
				break;
			case 1:
				arrSorted[1] += 1
				break;
			case 2:
				arrSorted[2] += 1
				break;
			case 3:
				arrSorted[3] += 1
				break;
			case 4:
				arrSorted[4] += 1
				break;
			case 5:
				arrSorted[5] += 1
				break;
			case 6:
				arrSorted[6] += 1
				break;
			case 7:
				arrSorted[7] += 1
				break;
			case 8:
				arrSorted[8] += 1
				break;
			case 9:
				arrSorted[9] += 1
				break;
			case 10:
				arrSorted[10] += 1
		}
	})

	return arrSorted
}


const Popup = ({ratings, sortedRatings, avgRating, togglePopup}) => {

	const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

	const options = {
		responsive: false,

		scales: {
			y: {
				display: false,
			},
			
		},
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
		},
	};

	const dataVoteDistribution = {
		labels,
		datasets: [
		  {
			label: 'Votes',
			data: sortedRatings,
			borderColor: 'rgb(10, 30, 58)',
			backgroundColor: '#38547c',
		  }
		],
	  };

	const dataVoteHistory = {
		labels,
		datasets: [
		  {
			label: 'Votes',
			data: ratings,
			borderColor: 'rgb(10, 30, 58)',
			backgroundColor: '#38547c',
		  }
		],
	};



	return (
		<div className={styles.popup}>
			<span className={styles.closeModal} onClick={togglePopup}>X</span>
			<div className={styles.section}>
				<div className={styles.popupRating}>
				<CircleRating avgRating={avgRating}/>
				</div>
				{/* Score breakdown - Amount of ratings */}
			</div>
			<div className={styles.section}>
				Score distribution
				<Chart options={options} data={dataVoteDistribution} />
			</div>
			<div className={styles.section}>
				Score history
				<Chart options={options} data={dataVoteHistory} />
			</div>
		</div>
	)
}

const Rating = ({reviewData}) => {
	const [isActive, setActive] = useState(false)
	let avgRating, reviews
	let ratings = [];


	// only if review has a rating === type equals 'review'
	reviews = reviewData.reviews.filter(rating => rating.type === 'review')

	
	if(reviews.length > 0) {
		avgRating = Math.floor(reviews.reduce((acc, review) => acc + review.rating,0) / reviews.length) * 10;
		reviews.map(review => ratings.push(review.rating))
	} else {
		avgRating = 0;
	}

	// Sort ratings for the chart
	const sortedRatings = sortRatings(ratings)

	
	const togglePopup = () => {
		setActive(!isActive)
	}
	
	return (
	<div className={styles.container}>
		<div className={styles.rating} onClick={togglePopup}>
			<CircleRating avgRating={avgRating}/>
		</div>

			<CSSTransition
			in={isActive}
			timeout={200}
			classNames={fadeTransition}
			unmountOnExit>
			<Popup
				ratings={ratings}
				sortedRatings={sortedRatings}
				avgRating={avgRating}
				togglePopup={togglePopup} />
			</CSSTransition>
	</div>
  )
}

export default Rating