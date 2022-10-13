import { database } from "firebase-admin";
import { db } from "../../lib/firebaseAdmin"

export default async function handler(req, res) {
	let inputTitle, inputGenre, inputDecadeStart, inputDecadeEnd, inputSort
	let movies = [];
	let data
	const query = req.query;

	if(query.title) inputTitle = query.Title
	if(query.genre) inputGenre = query.genre.split(' ');
	if(query.decade) {
		inputDecadeStart = Number(query.decade.slice(0,4));  
		inputDecadeEnd = inputDecadeStart + 9
	}
	if(query.sort) inputSort = query.sort;

	// console.log({inputTitle, inputGenre, inputDecadeStart})
	
	console.log('api', query)

	/*
	const colRef = db.collection('movies')

	if(inputTitle & inputGenre && inputDecadeStart) {
		console.log('title + genre + decade')
		data = await colRef
			.where("titleTags", "array-contains-any", inputTitle)
			.where("genre", "array-contains-any", inputGenre)
			.where("year", ">=", inputDecadeStart)
			.where("year", "<=", inputDecadeEnd)
			.get()
	} else if(inputTitle && inputGenre) {
		console.log('title + genre')
		data = await colRef
			.where("titleTags", "array-contains-any", inputTitle)
			.where("genre", "array-contains-any", inputGenre)
			get()
	} else if(inputTitle && inputDecadeStart) {
		console.log('title + decade')
		data = await colRef
			.where("titleTags", "array-contains-any", inputTitle)
			.where("year", ">=", inputDecadeStart)
			.where("year", "<=", inputDecadeEnd)
			.get()
	} else if(inputGenre && inputDecadeStart) {
		console.log('genre + decade')
		data = await colRef
			.where("genre", "array-contains-any", inputGenre)
			.where("year", ">=", inputDecadeStart)
			.where("year", "<=", inputDecadeEnd)
			.get()
	} else if(inputTitle) {
		console.log('title')
		data = await colRef
			.where("titleTags", "array-contains-any", inputTitle)
			.get()
	} else if(inputGenre) {
		console.log('genre')
		data = await colRef
			.where("genre", "array-contains-any", inputGenre)
			.get()
	} else if(inputDecadeStart) {
		console.log('decade')
		data = await colRef
			.where("year", ">=", inputDecadeStart)
			.where("year", "<=", inputDecadeEnd)
			.get()
	} else {
		console.log('no filter')
		data = await colRef.get()
	}

	data.forEach(doc => movies.push({ id: doc.id , ...doc.data() }));

	//console.log(movies)

	return res.status(200).json({ movies: movies });

	*/


// Start ---  return placeholder for testing without querying firestore
	const placeholderData = [
		{
			id: 'Toy-Story-3-535',
			imgBackgroundBlur: 'https://firebasestorage.googleapis.com/v0/b/nextjs-movies-3e25b.appspot.com/o/background%2Ftoystory3-bg-blur.jpg?alt=media&token=95ca5b79-a41b-4ec7-83e0-ec5d6fcd8630',
			year: '2012',
			title: 'Toy Story 3',
			rating: 3,
			description: 'Woody, Buzz, and the rest of Andy’s toys haven’t been played with in years. With Andy about to go to college, the gang find themselves accidentally left at a nefarious day care center. The toys must band together to escape and return home to Andy.',
			imgBackground: 'https://firebasestorage.googleapis.com/v0/b/nextjs-movies-3e25b.appspot.com/o/background%2Ftoystory3-bg.jpg?alt=media&token=5481316b-098b-4c33-a5ad-2d18b8d98ebf',
			genre: [ 'comedy', 'animation' ],
			imgPoster: 'https://firebasestorage.googleapis.com/v0/b/nextjs-movies-3e25b.appspot.com/o/poster%2Ftoy%20story%203.jpg?alt=media&token=c5a65684-f31b-4ee9-b740-459f14d48f9a',
			tagline: 'No toy gets left behind'
		},
		{
			id: 'Toy-Story-3-535',
			imgBackgroundBlur: 'https://firebasestorage.googleapis.com/v0/b/nextjs-movies-3e25b.appspot.com/o/background%2Ftoystory3-bg-blur.jpg?alt=media&token=95ca5b79-a41b-4ec7-83e0-ec5d6fcd8630',
			year: '2032',
			title: 'Toy Story 3',
			rating: 8,
			description: 'Woody, Buzz, and the rest of Andy’s toys haven’t been played with in years. With Andy about to go to college, the gang find themselves accidentally left at a nefarious day care center. The toys must band together to escape and return home to Andy.',
			imgBackground: 'https://firebasestorage.googleapis.com/v0/b/nextjs-movies-3e25b.appspot.com/o/background%2Ftoystory3-bg.jpg?alt=media&token=5481316b-098b-4c33-a5ad-2d18b8d98ebf',
			genre: [ 'comedy', 'animation' ],
			imgPoster: 'https://firebasestorage.googleapis.com/v0/b/nextjs-movies-3e25b.appspot.com/o/poster%2Ftoy%20story%203.jpg?alt=media&token=c5a65684-f31b-4ee9-b740-459f14d48f9a',
			tagline: 'No toy gets left behind'
		},
		{
			id: 'Toy-Story-3-535',
			imgBackgroundBlur: 'https://firebasestorage.googleapis.com/v0/b/nextjs-movies-3e25b.appspot.com/o/background%2Ftoystory3-bg-blur.jpg?alt=media&token=95ca5b79-a41b-4ec7-83e0-ec5d6fcd8630',
			year: '2022',
			title: 'Toy Story 3',
			rating: 5,
			description: 'Woody, Buzz, and the rest of Andy’s toys haven’t been played with in years. With Andy about to go to college, the gang find themselves accidentally left at a nefarious day care center. The toys must band together to escape and return home to Andy.',
			imgBackground: 'https://firebasestorage.googleapis.com/v0/b/nextjs-movies-3e25b.appspot.com/o/background%2Ftoystory3-bg.jpg?alt=media&token=5481316b-098b-4c33-a5ad-2d18b8d98ebf',
			genre: [ 'comedy', 'animation' ],
			imgPoster: 'https://firebasestorage.googleapis.com/v0/b/nextjs-movies-3e25b.appspot.com/o/poster%2Ftoy%20story%203.jpg?alt=media&token=c5a65684-f31b-4ee9-b740-459f14d48f9a',
			tagline: 'No toy gets left behind'
		}
	]
	return res.status(200).json({ movies:placeholderData  })
	// End ---  return placeholder for testing



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