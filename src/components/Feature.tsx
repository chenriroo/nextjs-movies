import styles from '../styles/Feature.module.css'

const Feature = ({hoverColor, icon}) => {

	return (
	<div className={`${styles.feature} ${styles[hoverColor]}`}>
			<span>Morbi sit amet varius nibh, non rhoncus mauris.</span>
	</div>
	)
}

export default Feature