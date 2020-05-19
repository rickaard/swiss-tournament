import React from 'react';

import MatchUpContainer from '../MatchUpContainer/MatchUpContainer';
import styles from './PoolItem.module.scss';

const PoolItem = ({ poolType, poolGames, poolId, updateMatchInSpecifcPool, showScore }) => {

    const poolItemStyles = () => {
        if (poolType === '0-0' ||
            poolType === '1-0' ||
            poolType === '0-1' ||
            poolType === '1-1') {
            return { height: '100%' }
        }
        if (poolType === '2-1' ||
            poolType === '1-2' ||
            poolType === '2-2') {
            return { minHeight: '220px' }
        }
        if (poolType === 'Grand Final') {
            return { minHeight: '110px' }
        }
        return {}
    }

    // console.log('PoolItem.js - ', poolType, poolGames);
    return (
        <div className={styles.PoolItem} style={poolItemStyles()}>
            <h3 className={styles.PoolType}>{poolType}</h3>
            <div className={styles.GamesWrapper}>
                {poolGames.map((game, index) => (
                    <MatchUpContainer
                        key={index}
                        game={game}
                        poolId={poolId}
                        updateMatchInSpecifcPool={updateMatchInSpecifcPool}
                        showScore={showScore}
                    />
                ))}
            </div>
        </div>
    )
}

export default PoolItem
