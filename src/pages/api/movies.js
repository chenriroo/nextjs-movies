import { database } from "firebase-admin";
import { db } from "../../lib/firebaseAdmin"

export default async function handler(req, res) {


	let movies, arrGenre, arrRating, arrDecade
	const query = req.query;
	const colRef = db.collection('movies');

	if(query.genre) arrGenre = query.genre.split(' ');
	if(query.rating) arrRating = query.rating.split(' ');
	if(query.decade) arrDecade = query.decade.split(' ');


	const data = await colRef
	.where("genre", "array-contains", "action")
	.get();

	data.forEach(movie => console.log(movie.data()))

	return res.status(200).json({ test: 'test' })

	if(!movies.exists) {
		return res.status(200).json({ name: 'John Doe' })
	}

	// return res.status(200).json({
	// 	id: movie.id,
	// 	movie: movie.data()
	// })
}