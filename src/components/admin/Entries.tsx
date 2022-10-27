import styles from '../../styles/admin/Entries.module.css'
import Entry from './Entry'
import { useEffect } from 'react'

const Entries = ({movies}) => {

	useEffect(() => {
		console.log(movies)
	},[movies])

	return (
		<div className={styles.container}>
			{movies.map(movie => {
				return <Entry key={movie.id} movie={movie} />
			})}
		</div>
	)
}

export default Entries