import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import { PoolContext } from '../../utils/TournamentContext';


import styles from './PoolsWrapper.module.scss';

import PoolRoundWrapper from '../PoolRoundWrapper/PoolRoundWrapper';

const PoolsWrapper = ({ tournamentId, authId }) => {
    const { pools } = useContext(PoolContext);
    // console.log('[PoolsWrapper] - PoolContext: ', pools);

    // Divide the pool round's into it own arrays
    const poolRoundOne = pools.filter(pool => pool.round === 1);
    const poolRoundTwo = pools.filter(pool => pool.round === 2);
    const poolRoundThree = pools.filter(pool => pool.round === 3);
    const poolRoundFour = pools.filter(pool => pool.round === 4);
    const poolRoundFive = pools.filter(pool => pool.round === 5);

    // console.log('[PoolsWrapper.js] - TurneringsId: ', tournamentId);
    // console.log('[PoolsWrapper.js] - authId: ', authId);

    // useEffect(() => {
    //     fetch('http://localhost:3001/tournament/' + tournamentId)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data.tournament);
    //     })
    //     .catch(error => console.log(error))

    // }, [])

    return (
        <div className={styles.PoolsWrapper}>
            <PoolRoundWrapper poolRound={poolRoundOne} />
            <PoolRoundWrapper poolRound={poolRoundTwo} />
            <PoolRoundWrapper poolRound={poolRoundThree} />
            <PoolRoundWrapper poolRound={poolRoundFour} />
            <PoolRoundWrapper poolRound={poolRoundFive} />
        </div> 
    )
}

PoolsWrapper.propTypes = {
    tournamentId: PropTypes.string,
    authId: PropTypes.string
}


export default PoolsWrapper
