import styles from '../../styles/CircleRating.module.css'
import { useState, useEffect } from 'react'

const CircleRating = ({avgRating}) => {	
	let radialStartAngle
	let ratingColor

	radialStartAngle = avgRating / 100 * 360 - 1;

	if(avgRating >= 0 && avgRating < 40) {
		ratingColor = '#b90f0f';
	} else if (avgRating >= 40 && avgRating < 60) {
		ratingColor = '#b9a00f';
	} else if (avgRating >= 60 && avgRating < 80) {
		ratingColor = '#5b9c26';
	} else if (avgRating >= 80) {
		ratingColor = '#12971e';
	}


	return (
	<>
		<div className={styles.circleOuter}>
			<div className={styles.circleBar}>
				<div 
				className={styles.circleRating}
				style={{ background: `conic-gradient(${ratingColor}, ${ratingColor} ${radialStartAngle}deg, rgba(255,255,255, 0) ${radialStartAngle+1}deg`}}
				>
					<div className={styles.circleInner}>
						<div className={styles.rating}>
							<span className={styles.average}>{avgRating}</span>
						</div>
					</div>
				</div>
			</div>


		</div>
	</>
  )
}

export default CircleRating