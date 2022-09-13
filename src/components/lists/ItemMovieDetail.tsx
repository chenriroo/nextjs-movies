import styles from './ItemMovieDetail.module.css'
import { useState, useRef  } from 'react'
import { animated, useSpring } from '@react-spring/web'
import InfoButton from '../InfoButton'
import Image from 'next/image'
import Link from 'next/link'

const ItemMovieDetail = ({data}) => {
	const [isHovered, setHovered] = useState(false)
	const dataDescription = data.description;
	const refElementDescription = useRef();
	const [springDescription, setSpringDescription] = useSpring(() => ({
		 y: 0,
	 }))

	 console.log(data)

	function Hover() {
		setHovered(true);
		const el = refElementDescription.current;
		const height = el.clientHeight;

		if(height > 110) {
			setSpringDescription.start({
				from: { y:0 },
				to: { y: 0-height+100 },
				loop: { reverse: true },
				delay: 2000,
				config: {
					duration: 3000,
				}
			})
		}
	}

	function unHover() {
		setHovered(false);
		setSpringDescription.start({
			y: 0,
			config: {
				duration: 100,
			}
		})
	}

	return (
		<div className={styles.itemRow}>
			<div className={styles.outerContainer}>
				<div className={`${styles.itemContainer}`} 
				onMouseEnter={() => Hover()} 
				onMouseLeave={() => unHover()}>
					<div className={styles.HalfLeft}>
						<div className={styles.poster}>
							<Image src={data.imgPoster} alt={`poster-${data.title}`} layout='fill' />
						</div>
						{isHovered && 
						<div className={styles.media}>
							<Image src={data.imgBackground} alt={`media-${data.title}`} layout='fill' />	
						</div>
						}
					</div>
					<div className={styles.HalfRight} >
						<div className={styles.title}>
							<Link href={`/movie/${encodeURIComponent(data.id)}`} passHref={true} >
								<a href='#'>
									<div>
										{data.title}
									</div>
								</a>
							</Link>
						</div>

						<div className={styles.details}>
							<div className={styles.tags}>
								{
									data.genre.map((genre,i) => <InfoButton key={`genre-${i}`} text={genre} canDelete={false}  /> )
								}
							</div>

							<div className={styles.date}>
								{data.year}
							</div>

							<div className={styles.descContainer}>
									<animated.div
									className={styles.descText}
									ref={refElementDescription}
									style={springDescription}>
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