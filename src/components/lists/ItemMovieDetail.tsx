import styles from './ItemMovieDetail.module.css'
import { useState, useEffect, useRef  } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { fileURLToPath } from 'url'

const ItemMovieDetail = ({data}) => {
	const [isHovered, setHovered] = useState(false)
	const [descriptionHeight, setDescriptionHeight] = useState(0)
	const dataDescription = data.description;
	const refElementDescription = useRef();

	const props = useSpring({
		 to: { y: 0 }, 
		 from: { y: 0-descriptionHeight+100 },
		 reset: true,
		 delay: 2000,
		 reverse: isHovered,
		 config: { duration: 3000 },
		 onRest: () => setHovered(!isHovered),
		 })

	function Hover() {
		setHovered(!isHovered)
		const el = refElementDescription.current;
		const height = el.clientHeight;
		setDescriptionHeight(height)
	}

	return (
		<div className={styles.itemRow}>
			<div className={styles.outerContainer}>
				<div className={`${styles.itemContainer}`} onMouseEnter={() => Hover()} >
				{/* <div className={`${styles.itemContainer}`} > */}
					<div className={styles.HalfLeft}>
					<div className={styles.poster}></div>
						{/* {
							isHovered && <div className={styles.video}>video</div>
						} */}
					</div>
					<div className={styles.HalfRight} >
						<div className={styles.title}>
							<a href='#'>
								<div>
									{data.title}
								</div>
							</a>
						</div>

						<div className={styles.details}>
							<div className={styles.tags}>
								{	
									data.genre.map(genre => <div key={`genre-${genre}`}className={styles.tag}>{genre}</div> )
								}
							</div>

							<div className={styles.date}>
								{data.year}
							</div>

							<div className={styles.descContainer}>
									<animated.div
									className={styles.descText}
									ref={refElementDescription}
									style={props}>
									{dataDescription}
									</animated.div>
							</div>

						</div>


						<div className={styles.rating} >
							Rating: {data.rating}
						</div>

					</div>
				</div>

			</div>

		</div>
	)
}

export default ItemMovieDetail