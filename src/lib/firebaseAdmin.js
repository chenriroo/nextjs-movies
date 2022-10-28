import * as admin from 'firebase-admin'

if(!admin.apps.length) {
	try {
		const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK)

		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount)
		});
	} catch (error) {
		console.log('Firebase admin initionalization error', error.stack)
	}


}

const db = admin.firestore()


export { db }

