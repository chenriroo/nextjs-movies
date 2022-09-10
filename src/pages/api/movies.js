import { database } from "firebase-admin";
import { db } from "../../lib/firebaseAdmin"

export default async function handler(req, res) {

	let arrGenre, arrDecade
	let movies = [];
	const query = req.query;
	const colRef = db.collection('movies');

	if(query.genre) arrGenre = query.genre.split(' ');
	if(query.decade) arrDecade = query.decade.split(' ');

	const data = await colRef
	.where("genre", "array-contains", "action")
	.get();

	data.forEach(movie => movies.push(movie.data()));

	return res.status(200).json({ movies: movies })

	if(!movies.exists) {
		return res.status(200).json({ name: 'John Doe' })
	}

	// return res.status(200).json({
	// 	id: movie.id,
	// 	movie: movie.data()
	// })
}