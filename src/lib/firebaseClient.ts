import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"

// these can be public, used environment variables just because
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId:process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
 };

let app, projectFirestore, projectStorage, projectAuth

if(!getApps.length) {
	app = initializeApp(firebaseConfig)

	projectFirestore = getFirestore(app);
	projectStorage = getStorage()
	projectAuth = getAuth(app)
}

export { projectFirestore, projectStorage, projectAuth }



