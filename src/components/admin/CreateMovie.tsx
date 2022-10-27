import { useEffect, useReducer, useState } from 'react'
import styles from '../../styles/admin/CreateMovie.module.css'
import ProgressBar from './ProgressBar'
import useAddMovie from '../../hooks/useAddMovie'


const initialState = {
	title: "",
	id: "",
	tagline: "",
	description: "",
	genre: [],
	imgPoster: null,
	imgBackground: null,
	imgBackgroundBlur: null,
}

function reducer(stateForm, action) {
	switch(action.type) {
		case "title":
			return { ...stateForm, title: action.value }
		case "id":
			return { ...stateForm, id: action.value }
		case "tagline":
			return { ...stateForm, tagline: action.value }
		case "description":
			return { ...stateForm, description: action.value }
		case "year":
			return { ...stateForm, year: action.value }
		case "addGenre":
			return { ...stateForm, genre: [...stateForm.genre, action.value ] }
		case "removeGenre":
			const foo = stateForm.genre.filter(entry => entry !== action.value);
			return { ...stateForm, genre: [...foo] }
		case "imgPoster":
			return { ...stateForm, imgPoster: action.value }
		case "imgBackground": 
			return { ...stateForm, imgBackground: action.value }
		case "imgBackgroundBlur":
			return { ...stateForm, imgBackgroundBlur: action.value }
		default:
			throw new Error()
	}
}

const CreateMovie = () => {
	const [stateForm, dispatch] = useReducer(reducer, initialState)
	const [validatedForm, setValidatedForm] = useState({})
	const [imgError, setImgError] = useState(null)
	const [titleError, setTitleError] = useState(null)
	const [success, setSuccess] = useState(null)
	const {progress, error} = useAddMovie(validatedForm)


	const handlerImage = (e) => {
		const imgFormats = ["image/png", "image/jpeg"]
		const imageType = e.target.name;
		let selected = e.target.files[0];
		
		if(selected && imgFormats.includes(selected.type)) {
			if(imageType === "imgPoster") dispatch({ type: "imgPoster", value: selected })
			if(imageType === "imgBackground") dispatch({ type: "imgBackground", value: selected })
			if(imageType === "imgBackgroundBlur") dispatch({ type: "imgBackgroundBlur", value: selected })
			setImgError(null);
		} else {
			if (imageType === "imgPoster") dispatch({ type: "imgPoster", value: null })
			if (imageType === "imgBackground") dispatch({ type: "imgBackground", value: null })
			if (imageType === "imgBackgroundBlur") dispatch({ type: "imgBackgroundBlur", value: null })
			setImgError([imageType,"Supported formats: png & jpeg"])
		}
	}

	const handlerGenre = (e) => {
		if(e.target.checked) {
			dispatch({ type:"addGenre", value: e.target.id })
		} else if(!e.target.checked) {
			dispatch({ type: "removeGenre", value: e.target.id })
		}
	}

	const handlerTitleID = (e) => {
		const title = e.target.value;
		dispatch({ type: "title", value: title })
		dispatch({ type: "id", value: `${title.replaceAll(' ','-')}-${Math.floor(Math.random()*2000)}` })
	}

	const handleSubmit = e => {
		e.preventDefault();

		if(stateForm.title.length < 1) {
			setTitleError(true);
			return
		} else setTitleError(false);
		if(imgError) return

		setTimeout(() => {
			setValidatedForm(stateForm)
		},3000)
	}

	return (
		<form className={styles.form}>
			<label htmlFor="title">Title</label>
			<input type="text" name="title" 
				onChange={handlerTitleID} required />
			{titleError && <span>Enter title</span>}

			<label htmlFor="id">id/slug</label>
			<input type="text" name="id" id={styles.id}
				value={`${stateForm.title.replaceAll(' ', '-')}_${Math.floor(Math.random() * 2000)}`} readOnly />
			
			<label htmlFor="tagline">tagline</label>
			<input type="text" name="tagline"
				onChange={e => dispatch({ type: "tagline", value: e.target.value })} />

			<label htmlFor="description">Description</label>
			<input type="text" name="description"
				onChange={e => dispatch({ type:"description", value: e.target.value })} />

			<label htmlFor="year">Year</label>
			<input type="text" name="year"
				onChange={e=>dispatch({ type:"year", value: e.target.value })} />
			
			<label htmlFor="genres">Genres</label>
			<div className={styles.genres}>
				<input type="checkbox" id="action" onChange={handlerGenre}name="action"/> <label htmlFor="action">Action</label>
				<input type="checkbox" id="animation" onChange={handlerGenre}/><label htmlFor="animation">Animation</label>
				<input type="checkbox" id="comedy" onChange={handlerGenre}/><label htmlFor="comedy">Comedy</label>
				<input type="checkbox" id="drama" onChange={handlerGenre}/><label htmlFor="drama">Drama</label>
				<input type="checkbox" id="fantasy" onChange={handlerGenre}/><label htmlFor="fantasy">Fantasy</label>
				<input type="checkbox" id="horror" onChange={handlerGenre}/><label htmlFor="horror">Horror</label>
				<input type="checkbox" id="romance" onChange={handlerGenre}/><label htmlFor="romance">Romance</label>
				<input type="checkbox" id="sciencefiction" onChange={handlerGenre}/><label htmlFor="sciencefiction">Science-Fiction</label>
				<input type="checkbox" id="thriller" onChange={handlerGenre}/><label htmlFor="thriller">Thriller</label>
				<input type="checkbox" id="war" onChange={handlerGenre}/><label htmlFor="war">War</label>
			</div>
			
			<label htmlFor="imgPoster">Poster</label>
			<input type="file" name="imgPoster" onChange={handlerImage}></input>
			<div className={styles.imageOutput}>
				{imgError && <div className={styles.imageError}>{imgError}</div>}
				{/* {image && <div className={styles.imageValid}>{image.name}</div> }
				{image && <ProgressBar file={image} setFile={setImage} /> } */}
			</div>

			<label htmlFor="imgBackground">Background image</label>
			<input type="file" name="imgBackground" onChange={handlerImage}></input>

			{/* {success && <div className={styles.formSuccess}>Success div</div>}
			{error && <div className={styles.formError}>Error div</div>} */}

			<label htmlFor="imgBackgroundBlur">Background Blur/placeholder</label>
			<input type="file" name="imgBackgroundBlur" onChange={handlerImage}></input>

			<button onClick={handleSubmit}>Add movie</button>
		</form>
	)
}

export default CreateMovie