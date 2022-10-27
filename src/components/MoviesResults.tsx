import SingleLine from "./lists/SingleLine"
import { database } from "firebase-admin"

interface MoviesResults {
	data?: Object,
	sort: string
}

const MoviesResults = ({ index, data, sort }) => {
	if(!data) return <div>Nothing</div>
	if(data.movies.length <= 0) return <div>No movies</div>

	console.log(data)

	return <SingleLine data={data.movies} type='detail' />
}

export default MoviesResults