import styles from '../styles/Pagination.module.css'

const Pagination = () => {
  return (
	<div className={styles.pagination}>
		<button>Previous</button>
		<button>Next</button>
	</div>
  )
}

export default Pagination