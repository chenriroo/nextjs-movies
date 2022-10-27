import styles from '../styles/OverviewEntry.module.css'
import Image from 'next/image'
import Link from 'next/link'

const OverviewEntry = ({movie, select}) => {


	return (
		<Link
		href={`/movie/${movie.slug}`}
		passHref={true}>
			<li className={styles.entryList} onClick={(e)=> select(e, movie)}>
				<Image 
				alt={`${movie.title} cover`}
				src={movie.image}
				layout=	'fill'
				objectFit='cover'
				>
				</Image>
				<span></span>
			</li>
		</Link>
	)
}

export default OverviewEntry