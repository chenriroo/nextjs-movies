import styles from '../styles/TopMenu.module.css'
import NavMenu from './NavMenu'
import Link from 'next/link'

const TopMenu = () => {

	return (
		<div className={styles.container}>

			
			<div className={styles.firstBlock}>
					<Link href={`/`} passHref={true}>
						<div className={styles.blockIcon}>
							<div className={styles.icon}>Movies</div>
						</div>
					</Link>

					<div className={styles.search}>
						<input type="text" placeholder="search"></input>
					</div>

					<div className={styles.socials}>
						FB,TW,IG
					</div>
			</div>
			
			<div className={styles.secondBlock}>
				<div className={styles.contentWrap}>
					<NavMenu />
				</div>
			</div>
			
			
		</div>
	)
}

export default TopMenu