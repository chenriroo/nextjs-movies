import { projectFirestore } from "../firebase/clientApp";
import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"

const useFetchReviews = (inputMovieID) => {
	const [isFetching, setFetching] = useState(false);
	const [reviews, setReviews] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!inputMovieID) return
		console.log('useFetchReviews')
		
		setFetching(true);
		const fetch = async () => {
			const refCollection = collection(projectFirestore, 'reviews');
			const queryID = query(refCollection, where("movieID", "==", inputMovieID));
			const data = await getDocs(queryID);
			setReviews(data.docs.map(entry => entry.data()));
		}

		fetch()
		setFetching(false);

	},[inputMovieID])


	return { isFetching, error, reviews }
}

export default useFetchReviews