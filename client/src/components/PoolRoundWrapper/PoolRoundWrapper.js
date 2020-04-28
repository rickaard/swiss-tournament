import React from 'react';
// import { PoolContext } from '../../utils/TournamentContext';
import PoolItem from '../PoolItem/PoolItem';
import styles from './PoolRoundWrapper.module.scss';

const PoolRoundWrapper = ({ poolRound }) => {
    // const { pools } = useContext(PoolContext);
    // console.log('[PoolRoundWrapper] - PoolContext: ', pools);
    console.log('PoolRoundWrapper.js - ', poolRound);
    return (
        <div className={styles.PoolRoundWrapper}>
            {poolRound.map((poolRound, index) => (
                <PoolItem 
                    key={index}
                    poolType={poolRound.poolType}
                    poolGames={poolRound.games}
                />
            ))}
        </div>
    )
}

export default PoolRoundWrapper
