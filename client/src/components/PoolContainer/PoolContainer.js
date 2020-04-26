import React from 'react'
import PropTypes, { number, string } from 'prop-types';

import styles from './PoolContainer.module.scss';

const PoolContainer = ({ games }) => {

    // pools.games contain an array with all the matchups + info about specific pool
    // pools.games = {
    //     [games],
    //     losses: number (0),
    //     wins: number (0),
    //     round: number (0),
    //     poolType: string ('0-0')
    // }

    // pools.games[0], specific matchup containing home team and away team with the score in the matchup
    // pools.games[0] = {
    //     id: number,
    //     away: string,
    //     awayScore: number,
    //     home: string,
    //     homeScore: number
    // }


    return (
        <div className={styles.PoolContainer}>
            
        </div>
    )
}

PoolContainer.propTypes = {
    games: PropTypes.arrayOf(PropTypes.object)
}


export default PoolContainer
