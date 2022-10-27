import { create } from "domain"
import { useContext, createContext, Context } from "react"
import { projectAuth } from "../lib/firebaseClient"

const authUserContext = createContext({
	authUser: null,
	loading: true
})

export const AuthUserContext = () => {
	

	return
}

export default AuthUserContext