import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

import styles from './TournamentPage.module.scss';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Tournament = () => {
    let { id } = useParams();
    const query = useQuery();
    const authId = query.get("auth");


    console.log(authId);

    return (
        <div className={styles.Container}>
            <h1>Tournament page id: {id}</h1>
            {authId && (
                <h2>Tournament auth id: {authId}</h2>
            )}
        </div>
    )
}

export default Tournament
