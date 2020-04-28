import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { PoolContext, TeamsContext, AuthContext } from '../../utils/TournamentContext';


import styles from './TournamentPage.module.scss';

import Spinner from '../../components/Spinner/Spinner';
import CurrentTimeContainer from '../../components/CurrentTimeContainer/CurrentTimeContainer';
import PoolsWrapper from '../../components/PoolsWrapper/PoolsWrapper';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Tournament = () => {
    let { id } = useParams();
    const query = useQuery();
    const [isLoaded, setIsLoaded] = useState(false);
    const [teams, setTeams] = useState(null);
    const [pools, setPools] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authId = query.get("auth");

    useEffect(() => {
        if (authId) setIsAuthenticated(true);
    }, [authId])

    useEffect(() => {
        fetch('http://localhost:3001/tournament/' + id)
            .then(response => response.json())
            .then(data => {
                console.log(data.tournament);
                setTeams(data.tournament.teams);
                setPools(data.tournament.pools);
                setIsLoaded(true);
            })
            .catch(error => console.log(error))

    }, [id])

    if (!isLoaded) return (
        <div className={styles.SpinnerWrapper}>
            <Spinner />
        </div>
    )

    return (
        <PoolContext.Provider value={{ pools, setPools }}>
            <TeamsContext.Provider value={{ teams, setTeams }}>
                <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>

                    <div className={styles.Container}>
                        <CurrentTimeContainer />
                        <PoolsWrapper
                            tournamentId={id}
                            authId={authId}
                        />
                    </div>
                </AuthContext.Provider>
            </TeamsContext.Provider>
        </PoolContext.Provider>

    )
}

export default Tournament
