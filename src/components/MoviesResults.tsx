import SingleLine from "./lists/SingleLine"
import { database } from "firebase-admin"

interface MoviesResults {
	data?: Object,
	sort: string
}

const MoviesResults = ({ data, sort }) => {
	if(!data) return <div>Nothing</div>
	if(data.movies.length <= 0) return <div>No movies</div>

	console.log(data)

	return <SingleLine data={data.movies} type='detail' />


	/* local sorting, instead should sort in firestore request
	if(sort === 'recent') {
		let foo = data.movies.slice().sort((a,b) => a.year - b.year)
		return <SingleLine data={foo} type='detail' />
	} else if(sort === 'top-rated') {
		let foo = data.movies.slice().sort((a,b) => b.rating - a.rating)
		return <SingleLine data={foo} type='detail' />
	} else if(sort === 'upcoming') {
		console.log(data.movies)
	} else {
		return <SingleLine data={data.movies} type='detail' />
	}
	*/

}

export default MoviesResults