import { db } from "../../lib/firebaseAdmin"

export default async function handler(req, res) {
	const movie = await db.collection('movies').doc('Alien-812').get()

	if(!movie.exists) {
		return res.status(200).json({ name: 'John Doe' })
	}
	return res.status(200).json({
		id: movie.id,
		movie: movie.data()
	})
}