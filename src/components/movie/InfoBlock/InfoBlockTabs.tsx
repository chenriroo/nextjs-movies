import { useState } from 'react'
import styles from './InfoBlock.module.css'

const InfoBlockTabs = ({activeTab, setActiveTab}) => {
	
	console.log(activeTab)

	return (
		<div className={styles.infoBlockTabs}>
			<header>
				<ul className={styles.list}>
					<li className={activeTab === 'info' ? styles.selectedTab : undefined}>
						<span
						className={styles.tabSpan}
						data-tab='info'
						onClick={setActiveTab}>
							Info
						</span>
					</li>
					<li className={activeTab === 'people' ? styles.selectedTab : undefined}>
						<span
						className={styles.tabSpan}
						data-tab='people'
						onClick={setActiveTab}>
							People
						</span>
					</li>
					<li className={activeTab === 'votes' ? styles.selectedTab : undefined}>
						<span
						className={styles.tabSpan}
						data-tab='votes'
						onClick={setActiveTab}>
							Votes
						</span>
					</li>
					<li className={`${activeTab === 'statistics' ? styles.selectedTab : undefined}`}>
						<span
						className={styles.tabSpan}
						data-tab='statistics'
						onClick={setActiveTab}>
							Statistics
						</span>
					</li>
				</ul>
			</header>
		</div>
	)
}

export default InfoBlockTabs