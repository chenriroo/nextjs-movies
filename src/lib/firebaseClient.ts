import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// these can be public, used environment variables just because
const firebaseConfig = {
	apiKey: "AIzaSyCxqWLtUxi8ECMJ7cRbwhpYypP-1eg08yg",
	authDomain: "nextjs-movies-3e25b.firebaseapp.com",
	projectId: "nextjs-movies-3e25b",
	storageBucket: "nextjs-movies-3e25b.appspot.com",
	messagingSenderId: "748235038",
	appId: "1:748235038:web:c94701d094b9a169e5410f",
	measurementId: "G-K5541BGSSE"
 };

let app, projectFirestore, projectStorage, projectAuth

if(!getApps.length) {
	app = initializeApp(firebaseConfig)

	projectFirestore = getFirestore(app);
	projectStorage = getStorage()
}

export { projectFirestore, projectStorage, projectAuth }



