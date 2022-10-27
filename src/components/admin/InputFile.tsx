const InputFile = ({name}) => {


	return (
		<>
			<label htmlFor={name}>{name}</label>
			<input name={name} type="file"></input>
		</>

	)
}

export default InputFile