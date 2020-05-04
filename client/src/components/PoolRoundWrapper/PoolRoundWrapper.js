import React, { useContext } from 'react';

import PoolItem from '../PoolItem/PoolItem';
import styles from './PoolRoundWrapper.module.scss';
import { PoolContext, TeamsContext } from '../../utils/TournamentContext';


const PoolRoundWrapper = ({ poolRound }) => {
    const { pools, setPools } = useContext(PoolContext);
    const { teams, setTeams } = useContext(TeamsContext);


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
        // Update pool context with new array
        setPools(updatedResult);

        // Find out what team won the match
        const winningTeam = matchObject.homeScore > matchObject.awayScore ? matchObject.home : matchObject.away;
        // Find out what team lost the match
        const loosingTeam = matchObject.homeScore < matchObject.awayScore ? matchObject.home : matchObject.away;

        // Construct new teams array and update winning teams stats
        const updatedWithWinningTeam = teams.map(team => {
            if (team.name !== winningTeam) return team;
            return {
                ...team,
                wins: team.wins + 1
            }
        });

        const updatedWithLoosingTeam = updatedWithWinningTeam.map(team => {
            if (team.name !== loosingTeam) return team;
            return {
                ...team,
                losses: team.losses + 1
            }
        });
        // Update the teams teams context with updated team results
        setTeams(updatedWithLoosingTeam);

    }


    return (
        <div className={styles.PoolRoundWrapper}>
            {poolRound.map((poolRound, index) => (
                <PoolItem
                    key={index}
                    poolType={poolRound.poolType}
                    poolGames={poolRound.games}
                    poolId={poolRound._id}
                    updateMatchInSpecifcPool={updateMatchInSpecifcPool}
                />
            ))}
        </div>
    )
}

export default PoolRoundWrapper

// [
//     {
//         _id: '324jkD',
//         round: 1,
//         wins: 0,
//         losses: 0,
//         games: [
//             {
//                 // DENNA MOTHERFUCKERN SKA UPPDATERAS
//                 _id: '3289jdkdjfdsl',
//                 away: 'bajskorv',
//                 home: 'kiss',
//                 awayScore: 0,
//                 homeScore: 0
//             },
//             {},
//             {}
//         ]
//     },
//     {},
//     {}
// ]