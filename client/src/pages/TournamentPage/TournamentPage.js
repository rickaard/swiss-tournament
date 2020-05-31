import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { PoolContext, TeamsContext, AuthContext } from '../../utils/TournamentContext';
import { SocketContext } from '../../utils/SocketContext';
import io from 'socket.io-client';

import useAllowedToGenerateNextRound from '../../utils/useAllowedToGenerateNextRound';

import styles from './TournamentPage.module.scss';

import Spinner from '../../components/Spinner/Spinner';
import CurrentTimeContainer from '../../components/CurrentTimeContainer/CurrentTimeContainer';
import PoolsWrapper from '../../components/PoolsWrapper/PoolsWrapper';
import DisplayResultModal from '../../components/DisplayResultModal/DisplayResultModal';


const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const socket = io(process.env.REACT_APP_SOCKET_ENDPOINT);


const Tournament = () => {
    let { id } = useParams();
    const query = useQuery();
    const [isLoaded, setIsLoaded] = useState(false);
    const [teams, setTeams] = useState(null);
    const [pools, setPools] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [matchResultData, setMatchResultData] = useState(null);
    const [currentRound, setCurrentRound] = useState(null);

    const isCurrentRoundFinished = useAllowedToGenerateNextRound(isAuthenticated, pools, currentRound); // custom hook

    const [isPlayoff, setIsPlayoff] = useState(false);

    const authId = query.get("auth");

    useEffect(() => {
        socket.emit('join', { tournamentId: id }, (error) => {
            if (error) {
                setIsLoaded(true);
            };
        });

    }, [id]);

    useEffect(() => {

        socket.on('tournament', (data) => {
            setTeams(data.teams);
            setPools(data.pools);
            setCurrentRound(data.currentRound);
            if (authId === data.authId) {
                setIsAuthenticated(true);
            }
            setIsLoaded(true);
        });

    }, [authId])

    useEffect(() => {
        socket.on('match-updated', (data) => {
            // console.log('TournamentPage.js - match-updated: ', data);

            setTeams(data.tournament.teams);
            setPools(data.tournament.pools);
            setMatchResultData(data.matchResult);
        });

        socket.on('next-round-generated', data => {
            // console.log(data);
            setPools(data.pools);
            setCurrentRound(data.currentRound);
        });


        socket.on('playoffs-init', data => {
            setPools(data.pools);
            setCurrentRound(data.currentRound);
        });

        socket.on('playoffs-updated', data => {
            setPools(data.pools);
            setCurrentRound(data.currentRound);
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, []);

    useEffect(() => {
        if (currentRound >= 6) {
            setIsPlayoff(true);
        }
    }, [currentRound])

    useEffect(() => {
        if (matchResultData) {
            setShowResultModal(true);
            setTimeout(() => {
                setShowResultModal(false);
            }, 4000) // 4000 = 4 seconds
        }
    }, [matchResultData]);

    const generateNextRound = () => {
        if (isCurrentRoundFinished) {
            socket.emit('generate-next-round', { currentRound: currentRound, tournamentId: id }, (error) => {
                if (error) console.log('Something went wrong!');
            });
        }
    }



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
                        <CurrentTimeContainer />

                        <SocketContext.Provider value={{ socket }}>
                            <PoolsWrapper
                                tournamentId={id}
                                isPlayoff={isPlayoff}
                            />
 
                            {isAuthenticated && (
                                <div className={styles.SettingsContainer}>
                                    {isCurrentRoundFinished && (
                                        <button className={styles.PopUp} onClick={generateNextRound}>Generate next round</button>
                                    )}
                                </div>
                            )}

                        </SocketContext.Provider>

                    </div>
                </AuthContext.Provider>
            </TeamsContext.Provider>
        </PoolContext.Provider>

    )
}

export default Tournament
