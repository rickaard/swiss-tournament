import React from 'react';
import PropTypes from 'prop-types';

import styles from './TournamentLinks.module.scss';

const TournamentLinks = ({ tournamentId, authId }) => {

    console.log('[TournamentLinks] - props: ', tournamentId);

    return (
        <div className={styles.LinkWrapper}>
            <h3>This is the link's to your newly created tournament</h3>
            <div className={styles.LinkItem}>
                <span>Admin page: </span>
                <a href={`/tournament/${tournamentId}?auth=${authId}`}>{`https://swisstournament.se/${tournamentId}?auth=${authId}`}</a>
            </div>
            <div className={styles.LinkItem}>
                <span>Display page:</span>
                <a href={`/tournament/${tournamentId}`}>{`https://swisstournament.se/${tournamentId}`}</a>
            </div>
            <div className={styles.Info}>
                <p>These links have been sent to your email aswell. Have fun!</p>
            </div>
        </div>
    )
}

TournamentLinks.propTypes = {
    tournamentId: PropTypes.string,
    authId: PropTypes.string
}

export default TournamentLinks
