import styles from '../styles/BackdropImage.module.css'
import Image from 'next/image'

const BackdropImage = ({ title, img, imgBlur }) => {
  return (

	  <div className={styles.headerContainer}>
		  <div className={styles.movieHeader}>
			  {img &&
				<div className={styles.movieHeaderFade}>
					{img &&
					<Image
						src={img}
						alt={title}
						layout='fill'
						objectFit="cover"
						placeholder='blur'
						blurDataURL={imgBlur}
					/>
					}
					<span className={styles.movieHeaderOverlay}></span>

				  </div>
			  }
		  </div>
	  </div>	
  )
}

export default BackdropImage