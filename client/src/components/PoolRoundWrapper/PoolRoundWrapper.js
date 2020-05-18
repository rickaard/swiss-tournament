import React, { useContext } from 'react';

import PoolItem from '../PoolItem/PoolItem';
import styles from './PoolRoundWrapper.module.scss';
import { PoolContext, TeamsContext } from '../../utils/TournamentContext';
import { SocketContext } from '../../utils/SocketContext';


const PoolRoundWrapper = ({ poolRound, tournamentId, showScore }) => {
    const { pools, setPools } = useContext(PoolContext);
    const { teams, setTeams } = useContext(TeamsContext);
    const { socket } = useContext(SocketContext);

    const updateMatchInSpecifcPool = (poolId, matchObject) => {

        // Construct new pool array and update match result in specific pool
        const updatedResult = pools.map(pool => {
            if (pool._id !== poolId) return pool;

            return {
                ...pool,
                games: [...pool.games].map(game => {
                    if (game._id !== matchObject.matchId) return game;

                    return {
                        ...game,
                        homeScore: Number(matchObject.homeScore),
                        awayScore: Number(matchObject.awayScore)
                    }
                })
            }
        });

        // Find out which team won the match
        const winningTeam = matchObject.homeScore > matchObject.awayScore ? matchObject.home : matchObject.away;
        // Find out which team lost the match
        const loosingTeam = matchObject.homeScore < matchObject.awayScore ? matchObject.home : matchObject.away;

        // Construct new teams array
        // Increment winning teams wins
        // Increment loosing teams losses
        const updatedTeams = teams.map(team => {
            if (team.name === winningTeam) {
                return {
                    ...team,
                    wins: team.wins + 1
                }
            };

            if (team.name === loosingTeam) {
                return {
                    ...team,
                    losses: team.losses + 1
                }
            };

            return team;
        });

        const tournamentObject = {
            teams: updatedTeams,
            pools: updatedResult,
            matchResult: matchObject,
            tournamentId: tournamentId
        }

        postUpdatedResult(tournamentObject)
    }

    const postUpdatedResult = (tournamentObj) => {
        socket.emit('update-match', { tournamentObj }, (error) => {

            if (error) return console.log('Something went wrong'); // CHANGE THIS!!!!!!!!!!!!!!!!!
            setPools(tournamentObj.pools);
            setTeams(tournamentObj.teams);
            console.log('PoolRoundWrapper.js - postUpdatedResult: inte error');
        });
    };


    return (
        <>
            <div className={styles.PoolRoundWrapper}>
                {poolRound.map((poolRound, index) => (
                    <PoolItem
                        key={index}
                        poolType={poolRound.poolType}
                        poolGames={poolRound.games}
                        poolId={poolRound._id}
                        updateMatchInSpecifcPool={updateMatchInSpecifcPool}
                        showScore={showScore}
                    />
                ))}
            </div>
        </>
    )
}

export default PoolRoundWrapper