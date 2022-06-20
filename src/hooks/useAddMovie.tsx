import { useRef, useState, useEffect } from "react";
import { projectStorage, projectFirestore } from "../firebase/clientApp";
import { doc, setDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import FileUploader from "../components/admin/InputFile";

const useStorage = (input) => {
	const [progress, setProgress] = useState(0)
	const [error, setError] = useState(null);

	const firstRender = useRef(true)

	useEffect(() => {
		if(firstRender.current) {
			firstRender.current = false;
			return
		}
		if(input === null) return
		if(Object.keys(input).length === 0) return

		console.log('hook useAddMovie')

		const addMovie = async () => {
			const refStorePoster = ref(projectStorage, `poster/${input.imgPoster.name}`);
			const refStoreBackground = ref(projectStorage, `background/${input.imgBackground.name}`);
			const refstoreBackgroundBlur = ref(projectStorage, `background/${input.imgBackgroundBlur.name}`);
			const refCollection = doc(projectFirestore, "movies", input.id);
			const uploadPoster = await uploadBytes(refStorePoster, input.imgPoster);
			const uploadBackground = await uploadBytes(refStoreBackground, input.imgBackground);
			const uploadBackgroundBlur = await uploadBytes(refstoreBackgroundBlur, input.imgBackgroundBlur);

			const imgPosterURL = await getDownloadURL(refStorePoster);
			const imgBackgroundURL = await getDownloadURL(refStoreBackground);
			const imgBackgroundBlurURL = await getDownloadURL(refstoreBackgroundBlur);

			setDoc(refCollection, {
				title: input.title,
				tagline: input.tagline,
				description: input.description,
				year: input.year,
				genre: input.genre,
				rating: 0,
				imgPoster: imgPosterURL,
				imgBackground: imgBackgroundURL,
				imgBackgroundBlur: imgBackgroundBlurURL
			})
		}
		addMovie()

	},[input, firstRender])

	return { progress, error }

}

export default useStorage