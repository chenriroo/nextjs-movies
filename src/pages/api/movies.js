import { database } from "firebase-admin";
import { db } from "../../lib/firebaseAdmin"

export default async function handler(req, res) {


	const placeholderData = [
		{
			id: 'Toy-Story-3-535',
			imgBackgroundBlur: 'https://firebasestorage.googleapis.com/v0/b/nextjs-movies-3e25b.appspot.com/o/background%2Ftoystory3-bg-blur.jpg?alt=media&token=95ca5b79-a41b-4ec7-83e0-ec5d6fcd8630',
			year: '2010',
			title: 'Toy Story 3',
			rating: 0,
			description: 'Woody, Buzz, and the rest of Andy’s toys haven’t been played with in years. With Andy about to go to college, the gang find themselves accidentally left at a nefarious day care center. The toys must band together to escape and return home to Andy.',
			imgBackground: 'https://firebasestorage.googleapis.com/v0/b/nextjs-movies-3e25b.appspot.com/o/background%2Ftoystory3-bg.jpg?alt=media&token=5481316b-098b-4c33-a5ad-2d18b8d98ebf',
			genre: [ 'comedy', 'animation' ],
			imgPoster: 'https://firebasestorage.googleapis.com/v0/b/nextjs-movies-3e25b.appspot.com/o/poster%2Ftoy%20story%203.jpg?alt=media&token=c5a65684-f31b-4ee9-b740-459f14d48f9a',
			tagline: 'No toy gets left behind'
		}
	]


	return res.status(200).json({ movies:placeholderData  })
	return

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





	data.forEach(doc => movies.push({ id: doc.id , ...doc.data() }));

	console.log(movies)

	return res.status(200).json({ movies: movies })

	if(!movies.exists) {
		return res.status(200).json({ name: 'John Doe' })
	}

	// return res.status(200).json({
	// 	id: movie.id,
	// 	movie: movie.data()
	// })
}