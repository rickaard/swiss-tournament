import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { PoolContext, TeamsContext, AuthContext } from '../../utils/TournamentContext';
import { SocketContext } from '../../utils/SocketContext';
import io from 'socket.io-client';


import styles from './TournamentPage.module.scss';

import Spinner from '../../components/Spinner/Spinner';
import CurrentTimeContainer from '../../components/CurrentTimeContainer/CurrentTimeContainer';
import PoolsWrapper from '../../components/PoolsWrapper/PoolsWrapper';
import DisplayResultModal from '../../components/DisplayResultModal/DisplayResultModal';


const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

// let socket;
const ENDPOINT = 'http://localhost:3001/';
const socket = io(ENDPOINT);


const Tournament = () => {
    let { id } = useParams();
    const query = useQuery();
    const [isLoaded, setIsLoaded] = useState(false);
    const [teams, setTeams] = useState(null);
    const [pools, setPools] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [matchResultData, setMatchResultData] = useState(null);

    const authId = query.get("auth");

    // useEffect(() => {

    //     fetch('http://localhost:3001/tournament/' + id)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('TournamentPage.js, resultat efter fetch: ', data.tournament);
    //             setTeams(data.tournament.teams);
    //             setPools(data.tournament.pools);
    //             if (authId === data.tournament.authId) {
    //                 setIsAuthenticated(true);
    //             }
    //             setIsLoaded(true);
    //         })
    //         .catch(error => {
    //             setIsLoaded(true);
    //             console.log(error);
    //         })

    // }, [id, authId])
    useEffect(() => {
        console.log('TournamentPage.js - useEffect')

        socket.emit('join', { tournamentId: id }, (error) => {
            if (error) {
                setIsLoaded(true);
            };
        });

    }, [id]);

    useEffect(() => {

        socket.on('tournament', (data) => {
            // console.log(data);
            setTeams(data.teams);
            setPools(data.pools);
            if (authId === data.authId) {
                setIsAuthenticated(true);
            }
            setIsLoaded(true);
        });

    }, [authId])

    useEffect(() => {
        socket.on('match-updated', (data) => {
            console.log('TournamentPage.js - match-updated: ', data);

            setTeams(data.tournament.teams); // FUNKAR INTE 
            setPools(data.tournament.pools); // FUNKAR INTE 
            setMatchResultData(data.matchResult); // FUNKAR
        })
    }, [])

    useEffect(() => {
        if (matchResultData) {
            setShowResultModal(true);
            setTimeout(() => {
                setShowResultModal(false);
            }, 4000)
        }
    }, [matchResultData])

    if (!isLoaded) return (
        <div className={styles.SpinnerWrapper}>
            <Spinner />
        </div>
    )

    if (!pools) return (
        <div className={styles.SpinnerWrapper}>
            <h1 style={{ color: '#dd892f' }}>No tournament with that ID found.</h1>
        </div>
    )

    return (
        <PoolContext.Provider value={{ pools, setPools }}>
            <TeamsContext.Provider value={{ teams, setTeams }}>
                <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>

                    <div className={styles.Container}>
                        {showResultModal && (
                            <DisplayResultModal
                                isOpen={showResultModal}
                                setIsOpen={setShowResultModal}
                                matchResultData={matchResultData}
                            />
                        )}
                        <CurrentTimeContainer
                            onClick={() => {
                                console.log('TournamentPage.js, teams-state: ', teams);
                                console.log('TournamentPage.js, pools-state: ', pools);
                            }} />

                        <SocketContext.Provider value={{ socket }}>
                            <PoolsWrapper
                                tournamentId={id}
                            // authId={authId}
                            />
                        </SocketContext.Provider>

                    </div>
                </AuthContext.Provider>
            </TeamsContext.Provider>
        </PoolContext.Provider>

    )
}

export default Tournament
