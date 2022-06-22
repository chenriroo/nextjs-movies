import Head from "next/head"
import TopMenu from "../../components/TopMenu"
import styles from "../../styles/Movie.module.css"
import { useState, useEffect } from "react"

import InfoBlockTabs from "../../components/InfoBlockTabs"
import useFetchMovie from "../../hooks/useFetchMovie"
import useFetchMovies from "../../hooks/useFetchMovies"
import useFetchReviews from "../../hooks/useFetchReviews"
import { useRouter } from "next/router"
import Image from "next/image"

import BackdropImage from "../../components/BackdropImage"
import MainMovie from "../../components/movie/MainMovie"
import MainCrew from "../../components/movie/MainCrew"
import MainVotes from "../../components/movie/MainVotes"
import MainStatistics from "../../components/movie/MainStatistics"
import SecondaryMovie from "../../components/movie/SecondaryMovie"

import ReviewSection from "../../components/review/ReviewSection"
import ReviewCreate from "../../components/review/ReviewCreate"
import Rating from "../../components/review/Rating"

import SingleLine from "../../components/lists/SingleLine"

import { projectFirestore } from "../../firebase/clientApp"
import { collection, getDocs } from "firebase/firestore"

const Movie = ({ fooData }) => {
	const router = useRouter()
	const { isFetching, movie, error } = useFetchMovie(router.query.title);
	const { 
		isFetching: reviewIsFetching,
		error:reviewError, reviews } = useFetchReviews(router.query.title);
	const [activeTab, setActiveTab] = useState('info')

	const [isLoggedIn, setLoggedIn] = useState(true) // temporary


	//console.log(movie)

	console.log(fooData)

	const tabClick = e => {
		setActiveTab(e.target.dataset.tab)
	}

	return (
	<>
		<Head>
			<title>Movie</title>
			<meta name="description" content="Generated by create next app" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<TopMenu />
		
		<BackdropImage 
		title={movie.title} img={movie.imgBackground} imgBlur={movie.imgBackgroundBlur}/>

			<div className={styles.containerContent}>

				<div className={styles.contentWrap}>

					{movie.imgPoster && 
					  <div className={styles.imgPosterContainer}>
						  <Image
							  src={movie.imgPoster}
							  alt={movie.title}
							  className={styles.imgPoster}
							  layout='fixed'
							  width={240}
							  height={350}
						  />
						  <span className={styles.imgPosterOverlay}></span>
					  </div> }
					
					<div className={styles.containerFirstContent}>
					  
						<div className={styles.firstContent}>
							<h1 className={styles.h1_movieTitle}>{movie.title}</h1>
							
							<SecondaryMovie movie={movie} />
						</div>
					</div>

					<div className={styles.containerRating}>
						<Rating reviews={reviews} />
					</div>

					<div className={styles.containerNews}>
						<SingleLine data={['asd','1','2','3',4]} type='news'/>
					</div>

					<div className={styles.containerRelated}>
						<SingleLine data={[0,1,2,3]} type='movie'/>
					</div>

				  	<div className={styles.containerSecondaryContent}>
					  <InfoBlockTabs setActiveTab={tabClick} activeTab={activeTab} />
							{{
								info: <MainMovie movie={movie} />,
								crew: <MainCrew cast={movie.cast} />,
								votes: <MainVotes movie={movie} />,
								statistics: <MainStatistics movie={movie} />
							}[activeTab]}
					</div>

					<div className={styles.containerReviews}>
						<h2 className="h2section">Reviews</h2>
						{isLoggedIn && <ReviewCreate movie={router.query.title} />}
						<ReviewSection reviews={reviews}/>
					</div>

				</div>
				
			</div>
	
	</>
  )
}

export async function getStaticPaths() {
	let paths;

	const refCollection = collection(projectFirestore, 'movies');
	const movies = await getDocs(refCollection);

	paths = movies.docs.map((movie) => {
		return {
			params: { title: movie.id }
		}
	})

	return {
		paths,
		fallback: false // false or 'blocking'
	};
  }
  

export async function getStaticProps() {
	const fooData = 'test - getStaticProps'

	return {
		props: { fooData }
	}
}

export default Movie

