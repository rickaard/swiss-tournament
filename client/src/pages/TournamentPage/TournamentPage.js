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
    // console.log('TournamentPage.js - authId: ', authId);

    // useEffect(() => {
        
    //     console.log('Är authenticerad: ', isAuthenticated);
    // }, [isLoaded])

    useEffect(() => {

        fetch('http://localhost:3001/tournament/' + id)
            .then(response => response.json())
            .then(data => {
                console.log('TournamentPage.js, resultat efter fetch: ', data.tournament);
                setTeams(data.tournament.teams);
                setPools(data.tournament.pools);
                if (authId === data.tournament.authId) {
                    setIsAuthenticated(true);
                }
                setIsLoaded(true);
            })
            .catch(error => {
                setIsLoaded(true);
                console.log(error);
            })

    }, [id, authId])

    if (!isLoaded) return (
        <div className={styles.SpinnerWrapper}>
            <Spinner />
        </div>
    )

    if (!pools) return (
        <div className={styles.SpinnerWrapper}>
            <h1 style={{color: '#dd892f'}}>No tournament with that ID found.</h1>
        </div>
    )

    // console.log('TournamentPage.js - Är authenticerad: ', isAuthenticated);

    return (
        <PoolContext.Provider value={{ pools, setPools }}>
            <TeamsContext.Provider value={{ teams, setTeams }}>
                <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>

                    <div className={styles.Container}>
                        <CurrentTimeContainer
                            onClick={() => {
                                console.log('TournamentPage.js, teams-state: ', teams);
                                console.log('TournamentPage.js, pools-state: ', pools);
                            }} />
                        <PoolsWrapper
                            tournamentId={id}
                            // authId={authId}
                        />
                    </div>
                </AuthContext.Provider>
            </TeamsContext.Provider>
        </PoolContext.Provider>

    )
}

export default Tournament
