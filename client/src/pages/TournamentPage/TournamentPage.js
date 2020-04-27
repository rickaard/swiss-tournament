import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

import styles from './TournamentPage.module.scss';

import CurrentTimeContainer from '../../components/CurrentTimeContainer/CurrentTimeContainer';
import PoolsWrapper from '../../components/PoolsWrapper/PoolsWrapper';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Tournament = () => {
    let { id } = useParams();
    const query = useQuery();
    const authId = query.get("auth");


    return (
        <div className={styles.Container}>
            <CurrentTimeContainer />
            <PoolsWrapper
                tournamentId={id}
                authId={authId}
            />
        </div>
    )
}

export default Tournament
