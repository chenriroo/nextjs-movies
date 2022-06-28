import { db } from "../../lib/firebaseAdmin"

export default async function handler(req, res) {

	const movies = await db.collection('movies').doc('Alien-812').get()
	console.log(movies.data())

	// movies.forEach((doc) => {
	// 	console.log(doc.id, '=>', doc.data());
	// })

	if(!movies.exists) {
		return res.status(200).json({ name: 'John Doe' })
	}
	return res.status(404).json({ name: 'poop' })
}