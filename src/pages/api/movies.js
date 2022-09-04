import { db } from "../../lib/firebaseAdmin"

export default async function handler(req, res) {
	const query = req.query;
	let data;
	let movies = [];
	const colRef = db.collection('movies');

	console.log(query)

	return res.status(200).json({
		id: 0,
		movie: 'TEST'
	})

	const movie = await db.collection('movies').doc('Alien-812').get()

	if(!movies.exists) {
		return res.status(200).json({ name: 'John Doe' })
	}
	
	return res.status(200).json({
		id: movie.id,
		movie: movie.data()
	})
}