import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { PoolContext } from '../../utils/TournamentContext';


import styles from './PoolsWrapper.module.scss';

import PoolRoundWrapper from '../PoolRoundWrapper/PoolRoundWrapper';

const nameTimeout = 10000;
const scoreTimeout = 3000;

const PoolsWrapper = ({ tournamentId }) => {
    const { pools } = useContext(PoolContext);
    const [showScore, setShowScore] = useState(false);

    useEffect(() => {

        const timeout = setTimeout(() => {
            setShowScore(!showScore);
        }, showScore ? scoreTimeout : nameTimeout);

        return () => clearTimeout(timeout);
    }, [showScore]);

    // Divide the pool round's into it own arrays
    const poolRoundOne = pools.filter(pool => pool.round === 1);
    const poolRoundTwo = pools.filter(pool => pool.round === 2);
    const poolRoundThree = pools.filter(pool => pool.round === 3);
    const poolRoundFour = pools.filter(pool => pool.round === 4);
    const poolRoundFive = pools.filter(pool => pool.round === 5);


    return (
        <div className={styles.PoolsWrapper}>
            <PoolRoundWrapper poolRound={poolRoundOne} tournamentId={tournamentId} showScore={showScore}/>
            <PoolRoundWrapper poolRound={poolRoundTwo} tournamentId={tournamentId} showScore={showScore} />
            <PoolRoundWrapper poolRound={poolRoundThree} tournamentId={tournamentId} showScore={showScore} />
            <PoolRoundWrapper poolRound={poolRoundFour} tournamentId={tournamentId} showScore={showScore} />
            <PoolRoundWrapper poolRound={poolRoundFive} tournamentId={tournamentId} showScore={showScore} />
        </div>
    )
}

PoolsWrapper.propTypes = {
    tournamentId: PropTypes.string,
    authId: PropTypes.string
}


export default PoolsWrapper
