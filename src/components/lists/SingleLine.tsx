// Entries on single dimension
import styles from './SingleLine.module.css'
import { useState } from 'react'

const ItemMovie = ({ data }) => {
	return (
		<div className={styles.containerItem}>
			<div>poster</div>
			<div className={styles.MovieInfo}>
				<span>Movie</span>
				<span>1999</span>
				<span>comments</span>
			</div>
			<div>R</div>
		</div>
	)
}

const ItemNews = ({data}) => {
	return (
		<div className={styles.containerItem}>
			<span>News Title</span>
			<span>Content...</span>
		</div>
	)
}


const SingleLine = ({ data, type }) => {

	const listItems = data.map((id,item) => {

		switch(type) {
			case 'movie':
				return <ItemMovie key={`movie-${id}`} data={item} />
			break;
			case 'news':
				return <ItemNews key={`newsitem-${id}`} data={item} />
			break;
			default:
				console.log('error')
			break;
		}
	})

	return (
		<>
			{listItems}
		</>
	)
}

export default SingleLine