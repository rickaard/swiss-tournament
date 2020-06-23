import React from 'react';
import { Helmet } from 'react-helmet';
import NewTournamentForm from '../../components/NewTournamentForm/NewTournamentForm';

import styles from './NewTourrnamentPage.module.scss';

const NewTournament = () => {

    return (
        <div className={styles.Container}>
            <Helmet>
                <title>Swiss tournaments - create your own tournament</title>
                <meta 
                    name="description"
                    content="Create and handle your own tournaments with the Swiss tournament format"
                /> 
            </Helmet>

            <div className={styles.ContentWrapper}>
                <h1>Create a new tournament</h1>
                <NewTournamentForm />
            </div>

        </div>
    )
}

export default NewTournament
