import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";

const useFetchMovie = (inputMovieID) => {
	const [isFetching, setFetching] = useState(false);
	const [movie, setMovie] = useState({
		title: "Movie title",
		tagline: "Tagline",
		description: "Movie description",
		year: "1900",
		genre: ["Action"],
		cast: {},
		rating: 0,
		imgPoster: "",
		imgBackground: "",
		imgBackgroundBlur: ""
	});
	const [error, setError] = useState("");

	useEffect(() => {
		if(!inputMovieID) return
		setFetching(true)
		
		console.log('useFetchMovie')

		const fetchMovie = async () => {
			const docRef = doc(projectFirestore, "movies", inputMovieID);
			const movie = await getDoc(docRef)
			const obj = movie.data()
			setMovie({
				title: obj.title,
				tagline: obj.tagline,
				description: obj.description,
				year: obj.year,
				genre: obj.genre,
				cast: obj.cast,
				rating: obj.genre,
				imgPoster: obj.imgPoster,
				imgBackground: obj.imgBackground,
				imgBackgroundBlur: obj.imgBackgroundBlur
			})
			setFetching(false)
		}

		fetchMovie()

	}, [inputMovieID])


	return { isFetching, movie, error }
}

export default useFetchMovie
