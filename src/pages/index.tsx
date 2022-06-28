import Head from 'next/head'
import Image from 'next/image'
import TopMenu from '../components/TopMenu'
import Hero from '../components/Hero'

import Overview from '../components/Overview'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import Feature from '../components/Feature'
import MoviesListHorizontal from '../components/MoviesListHorizontal'
import BackdropImage from '../components/BackdropImage'


import { projectFirestore, projectStorage } from '../lib/firebaseClient'
import { getDownloadURL, ref } from 'firebase/storage'
import { collection, getDocs } from 'firebase/firestore'

import useSWR from 'swr'
import { Suspense } from 'react'

export default function Home({ movies }) {
	const [backdropImg, setBackdropImg] = useState([])
	
	useEffect(() => {
		const getImg = async () => {
			const refBackdropImage = ref(projectStorage, 'background/home-bg.jpg')
			const refBackdropImgBlur = ref(projectStorage, 'background/home-bg-blur.jpg')
			const imgURL = await getDownloadURL(refBackdropImage)
			const imgBlurURL = await getDownloadURL(refBackdropImgBlur)
			setBackdropImg([imgURL,imgBlurURL])
		}
		getImg()

		console.log('useEffect: backdropimage')
	},[])

	return (
		<>
		<Head>
			<title>Home</title>
			<meta name="description" content="Generated by create next app" />
			<link rel="icon" href="/favicon.ico" />

		</Head>

		<TopMenu />
		
		<BackdropImage title= 'backdrop image' img={backdropImg[0]} imgBlur={backdropImg[1]} />

		<div className={styles.containerContent}>
			<div className={styles.contentWrap}>
				
				<section id={styles.hero}>
					<Hero movies={movies}/>
				</section>
				
				<section id='features'>
					<h2>Features</h2>
					<div className={styles.features}>
						<Feature hoverColor='green' icon='' />
						<Feature hoverColor='orange' icon=''/>
						<Feature hoverColor='blue' icon=''/>
						<Feature hoverColor='green' icon=''/>
						<Feature hoverColor='orange' icon=''/>
						<Feature hoverColor='blue' icon=''/>
					</div>
				</section>

				<section>
					<MoviesListHorizontal 
					title="Latest reviews"
					movies={movies}
					limit={10}
					posterSize='small'
					showDetail={false}
					/>
				</section>


				{/* <Overview movies={movies}/> */}

			</div>
		</div>

		</>
  )
}


export async function getStaticProps() {
	const refCollection = collection(projectFirestore, 'movies');
	const data = await getDocs(refCollection);

	const movies = data.docs.map((movie) => {
		return {
			...movie.data(),
			id: movie.id
		}
	}) 

	return {
		props: { movies },
		revalidate: 10,
	}
}

