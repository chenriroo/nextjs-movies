import Head from "next/head"
import TopMenu from "../../components/TopMenu"
import styles from "../../styles/Movie.module.css"
import { useState, useEffect } from "react"

import { useRouter } from "next/router"
import Image from "next/image"

import BackdropImage from "../../components/BackdropImage"
import InfoBlockTabs from "../../components/InfoBlockTabs"
import MainMovie from "../../components/movie/MainMovie"
import MainCrew from "../../components/movie/MainCrew"
import MainVotes from "../../components/movie/MainVotes"
import MainStatistics from "../../components/movie/MainStatistics"
import SecondaryMovie from "../../components/movie/SecondaryMovie"

import ReviewSection from "../../components/review/ReviewSection"
import ReviewCreate from "../../components/review/ReviewCreate"
import Rating from "../../components/review/Rating"
import SingleLine from "../../components/lists/SingleLine"

import useFetchReviews from "../../hooks/useFetchReviews"
import { db } from "../../lib/firebaseAdmin"

import useFetchMovies from "../../hooks/useFetchMovies"
import { projectFirestore } from "../../lib/firebaseClient"
import { doc, getDoc, collection, getDocs } from "firebase/firestore"

const Movie = ({ movieData, movieID}) => {
	const router = useRouter()
	const { 
		isFetching: reviewIsFetching,
		error:reviewError, reviews } = useFetchReviews(router.query.title);
	const [activeTab, setActiveTab] = useState('info')
	const [isLoggedIn, setLoggedIn] = useState(true) // temporary

	console.log(movieID)


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
		title={movieData.title} img={movieData.imgBackground} imgBlur={movieData.imgBackgroundBlur}/>

			<div className={styles.containerContent}>

				<div className={styles.contentWrap}>

					{movieData.imgPoster && 
						<div className={styles.imgPosterContainer}>
							<Image
								src={movieData.imgPoster}
								alt={movieData.title}
								className={styles.imgPoster}
								layout='fixed'
								width={240}
								height={350}
							/>
							<span className={styles.imgPosterOverlay}></span>
						</div> }
					
					<div className={styles.containerFirstContent}>
						<div className={styles.firstContent}>
							<h1 className={styles.h1_movieTitle}>{movieData.title}</h1>
							<SecondaryMovie movie={movieData} />
						</div>
					</div>

					<div className={styles.containerRating}>
						<Rating reviews={reviews} />
					</div>

					<div className={styles.containerNews}>
						<SingleLine data={['asd','1','2','3','4']} type='news'/>
					</div>

					<div className={styles.containerRelated}>
						<SingleLine data={[0,1,2,3]} type='movie'/>
					</div>

				  	<div className={styles.containerSecondaryContent}>
					  <InfoBlockTabs setActiveTab={tabClick} activeTab={activeTab} />
							{{
								info: <MainMovie movie={movieData} />,
								crew: <MainCrew cast={movieData.cast} />,
								votes: <MainVotes movie={movieData} />,
								statistics: <MainStatistics movie={movieData} />
							}[activeTab]}
					</div>

					<div className={styles.containerReviews}>
						<h2 className="h2section">Reviews</h2>
						<ReviewSection movieID={movieID}reviews={reviews} isLoggedIn={isLoggedIn}/>
					</div>

				</div>
				
			</div>
	
	</>
  )
}

export async function getStaticPaths() {
	let paths;
	const movies = await db.collection('movies').get()

	paths = movies.docs.map((movie) => {
		return {
			params: { title: movie.id }
		}
	})

	return {
		paths,
		fallback: 'blocking' // false or 'blocking'
	};
  }

export async function getStaticProps(context) {
	const movieID = context.params.title;
	const movie = await db.collection('movies').doc(movieID).get()

	const obj = movie.data();

	const movieData = {
		title: obj.title,
		tagline: obj.tagline,
		description: obj.description,
		year: obj.year,
		genre: obj.genre,
		cast: '',
		rating: obj.genre,
		imgPoster: obj.imgPoster,
		imgBackground: obj.imgBackground,
		imgBackgroundBlur: obj.imgBackgroundBlur
	}

	return {
		props: { movieData, movieID },
		revalidate: 10,
	}
}

export default Movie

