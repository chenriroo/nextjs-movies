import { db } from "../../lib/firebaseAdmin";

export default async function handler(req, res) {
	const query = req.query;
	let reviews = [];
	const colRef = db.collection('reviews');
	const data = await colRef.get();

	data.forEach((item) => reviews.push(item.data()))

	//console.log(query)

	if(!reviews) return res.status(200).json({ info: 'no data' })

	return res.status(200).json({ 
		movie: 'title',
		reviews: reviews,
	})
}