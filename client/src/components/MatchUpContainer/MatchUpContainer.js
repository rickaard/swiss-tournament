import React from 'react'
import styles from './MatchUpContainer.module.scss';

const MatchUpContainer = ({ game }) => {
    console.log('MatchUpContainer.js - game: ', game)
    return (
        <div className={styles.MatchUp} onClick={() => console.log('Klickat på en matchup')} >
            <div className={styles.HomeTeam}>{game.home}</div>
            <span className={styles.VersusText}>VS</span>
            <div className={styles.AwayTeam}>{game.away}</div>
        </div>
    )
}

export default MatchUpContainer
