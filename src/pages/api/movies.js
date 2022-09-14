import { database } from "firebase-admin";
import { db } from "../../lib/firebaseAdmin"

export default async function handler(req, res) {

	let arrGenre, arrDecade
	let movies = [];
	let data
	const query = req.query;
	const colRef = db.collection('movies');

	if(query.genre) arrGenre = query.genre.split(' ');
	if(query.decade) arrDecade = query.decade.split(' ');

	// console.log({query, arrGenre, arrDecade})

	console.log('-----------------------------')
	console.log(query.genre)
	console.log(arrGenre)
	console.log(arrDecade)




	if(arrGenre && arrDecade) {
		data = await colRef
		.where("genre", "array-contains-any", arrGenre)
		.get();
	} else if (arrGenre) {
		data = await colRef
		.where("genre", "array-contains-any", arrGenre)
		.get();
	} else if (arrDecade) {
		data = await colRef
		.get();
	} else {
		data = await colRef
		.get();
	}





	data.forEach(doc => movies.push({ id: doc.id , ... doc.data() }));

	return res.status(200).json({ movies: movies })

	if(!movies.exists) {
		return res.status(200).json({ name: 'John Doe' })
	}

	// return res.status(200).json({
	// 	id: movie.id,
	// 	movie: movie.data()
	// })
}