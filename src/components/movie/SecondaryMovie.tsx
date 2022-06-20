import styles from '../../styles/Infoblock.module.css'

const SecondaryMovie = ({movie}) => {
  return (
	<div>
		<h4>{movie.tagline}</h4>
		<p className={styles.p_description}>{movie.description}</p>
	</div>
  )
}

export default SecondaryMovie