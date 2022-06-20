import { useState, useEffect } from "react";
import { projectStorage, projectFirestore } from "../firebase/clientApp";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const useStorage = (file) => {
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState(null);
	const [url, setUrl] = useState(null);

	useEffect(() => {
		const storageRef = ref(projectStorage, `cover/${file.name}`);
		const collectionRef = collection(projectFirestore, 'movies')

		const uploadTask = uploadBytesResumable(storageRef, file);
		
		uploadTask.on('state_changed',
		(snapshot) => {
			const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
			setProgress(progress)
			if(snapshot.state === "paused") {
				console.log("Paused")
			} else if(snapshot.state === "running") {
				console.log("Uploading")
			}
		},
		(error) => {
			setError(error)
		},
		async () => {
			const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
			setUrl(downloadUrl)
			addDoc(collectionRef, {url: downloadUrl, createdAt: serverTimestamp()})
		})

	}, [file, url])

	return { progress, url , error }

}

export default useStorage