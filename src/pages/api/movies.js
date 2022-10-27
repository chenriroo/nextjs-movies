import { database } from "firebase-admin";
import { unstable_batchedUpdates } from "react-dom";
import { db } from "../../lib/firebaseAdmin"

export default async function handler(req, res) {
	let inputTitle, inputGenre, inputDecadeStart, inputDecadeEnd, inputSort, page, lastDoc
	let movies = [];
	let data
	const query = req.query;
	const colRef = db.collection('movies')
	const conditions = []

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
		},
		{
			id: 'Toy-Story-3-535',
			imgBackgroundBlur: 'https://firebasestorage.googleapis.com/v0/b/nextjs-movies-3e25b.appspot.com/o/background%2Ftoystory3-bg-blur.jpg?alt=media&token=95ca5b79-a41b-4ec7-83e0-ec5d6fcd8630',
			year: '2004',
			title: 'Toy Story 3',
			rating:6,
			description: 'Woody, Buzz, and the rest of Andy’s toys haven’t been played with in years. With Andy about to go to college, the gang find themselves accidentally left at a nefarious day care center. The toys must band together to escape and return home to Andy.',
			imgBackground: 'https://firebasestorage.googleapis.com/v0/b/nextjs-movies-3e25b.appspot.com/o/background%2Ftoystory3-bg.jpg?alt=media&token=5481316b-098b-4c33-a5ad-2d18b8d98ebf',
			genre: [ 'comedy', 'animation' ],
			imgPoster: 'https://firebasestorage.googleapis.com/v0/b/nextjs-movies-3e25b.appspot.com/o/poster%2Ftoy%20story%203.jpg?alt=media&token=c5a65684-f31b-4ee9-b740-459f14d48f9a',
			tagline: 'No toy gets left behind'
		},
		{
			id: 'Toy-Story-3-535',
			imgBackgroundBlur: 'https://firebasestorage.googleapis.com/v0/b/nextjs-movies-3e25b.appspot.com/o/background%2Ftoystory3-bg-blur.jpg?alt=media&token=95ca5b79-a41b-4ec7-83e0-ec5d6fcd8630',
			year: '1993',
			title: 'Toy Story 3',
			rating:10,
			description: 'Woody, Buzz, and the rest of Andy’s toys haven’t been played with in years. With Andy about to go to college, the gang find themselves accidentally left at a nefarious day care center. The toys must band together to escape and return home to Andy.',
			imgBackground: 'https://firebasestorage.googleapis.com/v0/b/nextjs-movies-3e25b.appspot.com/o/background%2Ftoystory3-bg.jpg?alt=media&token=5481316b-098b-4c33-a5ad-2d18b8d98ebf',
			genre: [ 'comedy', 'animation' ],
			imgPoster: 'https://firebasestorage.googleapis.com/v0/b/nextjs-movies-3e25b.appspot.com/o/poster%2Ftoy%20story%203.jpg?alt=media&token=c5a65684-f31b-4ee9-b740-459f14d48f9a',
			tagline: 'No toy gets left behind'
		}
	]

	if(query.title) {
		inputTitle = query.title.split(' ')
	}

	if(query.genre) {
		inputGenre = query.genre.split(' ');
	}
	if(query.decade) {
		inputDecadeStart = Number(query.decade.slice(0,4));  
		inputDecadeEnd = inputDecadeStart + 9
	}
	if(query.sort) {
		switch(query.sort) {
			case 'top-rated':
				inputSort = ['rating', 'desc']
				
				break;
			case 'upcoming':
				inputSort = ['year', 'asc']
				break;
			case 'recent':
				inputSort = ['year', 'desc']
				break;
		}
	}

	if(query.lastDoc) {
		lastDoc = query.lastDoc
		console.log(lastDoc)
	}


	// console.log({inputTitle, inputGenre, inputDecadeStart})
	
	/*
	console.log('----------------------------- Pagination first test -----------------------------')

	console.log('page:', query.page)

	const first = colRef
		.orderBy('year')
		.limit(3)

	const snapshot = await first.get()

	const last = snapshot.docs[snapshot.docs.length -1];

	snapshot.forEach(doc => console.log(doc.data()))

	console.log('----------------')
	console.log(last.data())

	snapshot.forEach((doc) => movies.push({
		id: doc.id,
		...doc.data()
	}))


	return res.status(200).json({ movies:movies  }) // End ---  return placeholder for testing
	
	*/

	console.log('----------------------------- QUERY -----------------------------')

	console.log('api', query)
	console.log('inputSort:', inputSort)


	// START - testing conditional query array - might not work in nodeJS
	// Use conditional to push queries into array
	// Run query by calling this array

	// if(inputTitle) conditions.push(where("titleTags", "array-contains-any", inputTitle))
	// if(inputDecadeStart) conditions.push(where("year", ">=", inputDecadeStart), where("year", "<=", inputDecadeEnd))
	// if(inputGenre) conditions.push(where("genre", "array-contains-any", inputGenre))
	// if(inputSort) conditions.push(orderBy('rating'))

	// END - testing conditional query array


	// Conditional method can get very complex


	
	if(inputGenre && inputDecadeStart && inputSort) {
		console.log('genre + decade + sort')
		data = await colRef
			.where("genre", "array-contains-any", inputGenre)
			.where("year", ">=", inputDecadeStart)
			.where("year", "<=", inputDecadeEnd)
			.orderBy(inputSort[0], inputSort[1])
			.get()
	} else if(inputGenre && inputDecadeStart) {
			console.log('genre + decade')
			data = await colRef
				.where("genre", "array-contains-any", inputGenre)
				.where("year", ">=", inputDecadeStart)
				.where("year", "<=", inputDecadeEnd)
				.get()
	} else if(inputGenre && inputSort) {
			console.log('genre + sort')
			data = await colRef
				.where("genre", "array-contains-any", inputGenre)
				.orderBy(inputSort[0], inputSort[1])
				.get()
	} else if(inputDecadeStart && inputSort) {
			console.log('decade + sort')
			data = await colRef
				.where("year", ">=", inputDecadeStart)
				.where("year", "<=", inputDecadeEnd)
				.orderBy(inputSort[0], inputSort[1])
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
	} else if(inputSort) {
		console.log('sort')
		data = await colRef
			.orderBy(inputSort[0], inputSort[1])
			.get()
	} else {
		console.log('no filter')
		data = await colRef
		.get()


	}

	data.forEach(doc => movies.push({ id: doc.id , ...doc.data() }));

	console.log(movies)

	return res.status(200).json({ movies: movies });

	
	



	



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