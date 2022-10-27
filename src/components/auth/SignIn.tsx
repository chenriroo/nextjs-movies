import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { projectAuth } from "../../lib/firebaseClient"



const SignIn = () => {

	return(
		<>
			<div>
				<span>Username</span>
				<input type="text" placeholder="Username" name="" id="" />
			</div>
			<div>
				<span>Password</span>
				<input type="password" placeholder="Password" name="" id="" />
			</div>
			<button>Submit</button>
		</>
	)
	
}