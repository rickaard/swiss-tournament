import React from 'react'

import styles from './TournamentLinks.module.scss';

const TournamentLinks = () => {
    return (
        <div className={styles.LinkWrapper}>
            <h3>This is the link's to your newly created tournament</h3>
            <div className={styles.LinkItem}>
                <span>Admin page: </span>
                <a href="#">https://swisstournament.se/39fd8d9f99?auth=39fd839</a>
            </div>
            <div className={styles.LinkItem}>
                <span>Display page:</span>
                <a href="#">https://swisstournament.se/39fd8d9f99</a>
            </div>
            <div className={styles.Info}>
                <p>These links have been send to your email aswell. Have fun!</p>
            </div>
        </div>
    )
}

export default TournamentLinks
