import { useState } from 'react'
import styles from './InfoBlock.module.css'

import InfoBlockTabs from './InfoBlockTabs'
import BlockMovie from './BlockMovie'
import BlockCrew from './BlockCrew'
import BlockVotes from './BlockVotes'
import BlockStatistics from './BlockStatistics'

const InfoBlock = ({ movie }) => {
	const [activeTab, setActiveTab] = useState('info')

	function tabClick(e) {
		setActiveTab(e.target.dataset.tab)
	}

  return (
	<div className={styles.infoBlock}>
		<InfoBlockTabs setActiveTab={tabClick} activeTab={activeTab}/>
			{{
				info: <BlockMovie movie={movie} />,
				people: <BlockCrew cast={movie.cast} />,
				votes: <BlockVotes movie={movie} />,
				statistics: <BlockStatistics movie={movie} />
			}[activeTab]}
	</div>
  )
}

export default InfoBlock