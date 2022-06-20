import styles from './FormError.module.css'

const FormError = ({text}) => {
  return (
	<div className={styles.formError}>
		{text}
	</div>
  )
}

export default FormError