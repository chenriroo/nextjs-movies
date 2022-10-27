import { db } from "../../lib/firebaseAdmin";

export default async function handler(req, res) {
	const query = req.query;
	let data
	let reviews = [];
	const colRef = db.collection('reviews');

	if(query.hasOwnProperty('movie')) {
		data = await colRef.where('movieID', '==', query.movie).get()
	} else {
		data = await colRef.get()
	}
	
	data.forEach((item) => reviews.push(item.data()))

	if(!reviews) return res.status(200).json({ info: 'no data' })

	return res.status(200).json({ 
		movie: 'title',
		reviews: reviews,
	})
}