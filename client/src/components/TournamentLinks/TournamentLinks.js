import React from 'react'

import styles from './TournamentLinks.module.scss';

const TournamentLinks = () => {
    const id = '39fd8d9f99';
    const authId = '39fd839';

    return (
        <div className={styles.LinkWrapper}>
            <h3>This is the link's to your newly created tournament</h3>
            <div className={styles.LinkItem}>
                <span>Admin page: </span>
                <a href={`/tournament/${id}?auth=${authId}`}>{`https://swisstournament.se/${id}?auth=${authId}`}</a>
            </div>
            <div className={styles.LinkItem}>
                <span>Display page:</span>
                <a href={`/tournament/${id}`}>{`https://swisstournament.se/${id}`}</a>
            </div>
            <div className={styles.Info}>
                <p>These links have been sent to your email aswell. Have fun!</p>
            </div>
        </div>
    )
}

export default TournamentLinks
