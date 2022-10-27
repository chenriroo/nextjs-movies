import { useEffect } from "react";
import useStorage from "../../hooks/useStorage";
import styles from "../../styles/admin/ProgressBar.module.css"

const ProgressBar = ({file, setFile}) => {
	const { url, progress } = useStorage(file)
	console.log(progress, url)

	useEffect(() => {
		if(url) {
			setFile(null)
		}
	}, [url, setFile])

	return (
		<div className={styles.progressBar} style={{ width: progress + '%'}}>Progress</div>
	)
}

export default ProgressBar