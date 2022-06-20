import { projectFirestore } from '../firebase/clientApp';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useReducer, useState, useEffect } from 'react'

const initialState = {
	content: '',
	type: '',
	rating: null,
	errors: {},
}

function reducer(state, action) {
	switch (action.type) {
		case 'content':
			return { ...state, content: action.value }
		case 'rating':
			return { ...state, rating: action.value }
		case 'type':
			return { ...state, type: action.value }
		case 'error':
			return { 
				...state, 
				errors: {
					...state.errors,
					...action.value
				}
			}
		case 'errorDelete':
			const input = action.value;
			const errorsObj = { ...state.errors };
			delete errorsObj[input]

			return {
				...state,
				errors: {
					...errorsObj
				}
			}
	}
}

const useAddReview =(callback, movie) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const [errors, setError] = useState({});
	const [formSubmitted, setFormSubmitted] = useState(false)


	const handleInput = (e) => {
		const inputName = e.target.name;
		const inputValue = e.target.value;
		const inputType = e.target.type


		if(inputType === 'radio') {
			dispatch({ type: 'type', value: inputValue });
			//validate(e, 'type', inputValue) //this only works after the second click? rerender issue?
			dispatch({ type: 'errorDelete', value: 'type' }) // This works after the first click, opposed to the dispatch in validate
		} else {
			//validate(e, inputName, inputValue)
			dispatch({ type: inputName, value: inputValue });
		}

	};

	const handleSubmit = (e) => {
		e.preventDefault();
		validate(e, 'content', state.content)
		validate(e, 'type', undefined)
		setFormSubmitted(true)
	}

	const validate = (event, inputName, inputValue) => {
		switch(inputName) {
			case 'content':
				if(inputValue.length < 20) {
					const errObj = { content: 'Minimum character length: 20 .' }
					dispatch({ type: 'error', value: errObj })
				} else {
					dispatch({ type: 'errorDelete', value: 'content' })
				}
			break;
			case 'type':
				if(state.type !== '') {
					// remove the error from state
					console.log('validate.type - remove error from state')
					dispatch({ type: 'errorDelete', value: 'type' }); // This only works after the second click? rerender?
				} else {
					// add error to state
					console.log('add error to state')
					const errObj = { type: 'Select a type' }
					dispatch({ type: 'error', value: errObj });
				}
			break;
			case 'rating':
				if(!inputValue.isInteger()) {
					const errObj = { ...errors, rating: 'not a number' }
					setError({})
				} else {
					console.log('validate: rating valid')
				}
			break;
			default:
				throw new Error('Invalid action type')
				break;
		}

	}

	useEffect(() => {
		setFormSubmitted(false);

		if(!formSubmitted) return
		if(Object.keys(state.errors).length !== 0) {
			return 
		}

		const foo = async () => {
			const refCollection = collection(projectFirestore, 'reviews');
			
			let objData

			if(state.type === 'review') {
				objData = {
					movie: 'foo',
					movieID: movie,
					user: 'foo',
					rating: state.rating,
					content: state.content,
					type: state.type,
					createdAt: serverTimestamp()
				}
			} else {
				objData = {
					movie: 'foo',
					movieID: movie,
					user: 'foo',
					content: state.content,
					type: state.type,
					createdAt: serverTimestamp()
				}
			}


			console.log(objData)
			
			await addDoc(refCollection, objData)
		}
		foo()
		
	},[formSubmitted, state, movie])
	

	return { handleInput, handleSubmit, state }
}

export default useAddReview