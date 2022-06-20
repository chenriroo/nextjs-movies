import styles from '../styles/NavMenu.module.css'
import Link from 'next/link'

const NavMenu = () => {
	
	return (
		<nav className={styles.container}>
			<li className={styles.link}><span className={styles.inactive}>News</span></li>
			<li className={styles.link}><Link href={`/movies`} passHref={true}><span>Movies</span></Link></li>
			<li className={styles.link}><span className={styles.inactive}>Series</span></li>
			<li className={styles.link}><span className={styles.inactive}>Cast & Crew</span></li>
			<li className={styles.link}><span className={styles.inactive}>On Demand</span></li>
			<li className={styles.link}><div>Sign In</div></li>
		</nav>
	)
}

export default NavMenu