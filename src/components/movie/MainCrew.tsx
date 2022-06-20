import styles from '../../styles/MainCrew.module.css'


const MainCrew = ({cast}) => {

  console.log('secondaryCrew:',cast)

  return (
    <div className={styles.container}>
    Crew
      <div className={styles.crewBlock}>
        <span>Director:{cast.director}</span>
        <span>Writer:{cast.writer}</span>
      </div>

      Actors/Actrice
      <div className={styles.crewBlock}>
      <span>blabla</span>
      <span>blabla</span>
      <span>blabla</span>
      <span>blabla</span>
      <span>blabla</span>
      </div>
    </div>
  )
}

export default MainCrew