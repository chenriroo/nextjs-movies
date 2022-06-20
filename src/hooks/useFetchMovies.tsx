import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/clientApp"
import { collection, getDocs } from "firebase/firestore"


const useFetchMovies = () => {
	const [isFetching, setFetching] = useState(false);
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState('')

	useEffect(() => {
		setFetching(true)
		const refCollection = collection(projectFirestore, 'movies')
		getDocs(refCollection)
			.then(data => {
				setMovies(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
			})
			.catch(err => setError(err))
			.finally(() => setFetching(false))
	},[])


	return { isFetching, movies, error }
}

export default useFetchMovies