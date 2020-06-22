import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NoTournamentPage.module.scss';

const NoTurnamentPage = () => {

    return (
        <div className={styles.Wrapper}>
            <div>
                <p>No provided tournament ID.</p>
                <p>Make your own Swiss tournament </p>
                <span><Link to="/">here</Link></span>
            </div>
        </div>
    )
}

export default NoTurnamentPage
