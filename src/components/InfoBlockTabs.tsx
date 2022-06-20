import { useState } from 'react'
import styles from '../styles/InfoBlockTabs.module.css'

const InfoBlockTabs = ({activeTab, setActiveTab}) => {
	
	return (
		<div className={styles.infoBlockTabs}>
			<header>
				<ul className={styles.list}>
					<li className={activeTab === 1 ? styles.selectedTab : undefined}>
						<span className={styles.tabSpan} data-tab='info' onClick={setActiveTab}>Info</span>
					</li>
					<li className={activeTab === 2 ? styles.selectedTab : undefined}>
						<span className={styles.tabSpan} data-tab='crew' onClick={setActiveTab}>People</span>
					</li>
					<li className={activeTab === 3 ? styles.selectedTab : undefined}>
						<span className={styles.tabSpan} data-tab='votes' onClick={setActiveTab}>Votes</span>
					</li>
					<li className={`${activeTab === 4 ? styles.selectedTab : undefined}`}>
						<span className={styles.tabSpan} data-tab='statistics' onClick={setActiveTab}>Statistics</span>
					</li>
				</ul>
			</header>
		</div>
	)
}

export default InfoBlockTabs