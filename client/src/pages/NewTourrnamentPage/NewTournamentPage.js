import React from 'react'
import NewTournamentForm from '../../components/NewTournamentForm/NewTournamentForm';

import styles from './NewTourrnamentPage.module.scss';

// import backgroundImage from '../../assets/bg.svg';

const NewTournament = () => {
    return (
        <div className={styles.Container}>

            <div className={styles.ContentWrapper}>
                <h1>Create a new tournament</h1>
                <NewTournamentForm />
            </div>

        </div>
    )
}

export default NewTournament
