import styles from '../../styles/Form.module.css'

const Textarea = ({ name, onChange }) => {
  return (
	<textarea name={name} onChange={onChange}></textarea>
  )
}

export default Textarea