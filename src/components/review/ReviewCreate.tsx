import styles from '../../styles/ReviewCreate.module.css'
import useAddReview from '../../hooks/useAddReview'
import FormError from '../form/FormError'
import { useEffect, useState } from 'react'

import Textarea from '../form/Textarea'
import RadioButton from '../form/RadioButton'
import RatingRange from '../form/RatingRange'


const formSubmitted = (e) => {
	//e.preventDefault()
	console.log('callbackFn when form is submitted')
}

const ReviewCreate = ({movie}) => {
	const { handleInput, handleSubmit, state } = useAddReview(formSubmitted, movie)

	console.log(state)

  	return (
	<div className={styles.container}>
		<form onSubmit={handleSubmit}>
			<div className={styles.top}>
				<div className={styles.topUser}>
					User
				</div>
				
				<div className={styles.topOptions} >
					{ state.errors.type ? <FormError text={state.errors.type}/> : undefined }
					<RadioButton name='Comment' checked={state.type == 'comment'} handleInput={handleInput} />
					<RadioButton name='Review' checked={state.type == 'review'} handleInput={handleInput} />
				</div>

			</div>

			{ state.errors.content ? <FormError text={state.errors.content}/> : undefined }
			<Textarea name='content' onChange={handleInput}/>

			{ state.type === 'review' ?
			<RatingRange handleInput={handleInput} />
			: undefined}

			<input type="submit" value="submit" />
		</form>

	</div>
  )
}

export default ReviewCreate