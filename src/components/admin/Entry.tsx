import styles from '../../styles/admin/Entry.module.css'

const Entry = ({movie}) => {

	return (
		<div className={styles.container}>
			<span className={styles.title}>{movie.title}</span>
			<div className={styles.containerTools}>
				<span>Edit</span>
				<span>Delete</span>
			</div>

		</div>
	)
}

export default Entry