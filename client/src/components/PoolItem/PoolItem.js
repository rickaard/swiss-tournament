import React from 'react';

import MatchUpContainer from '../MatchUpContainer/MatchUpContainer';
import styles from './PoolItem.module.scss';

const PoolItem = ({ poolType, poolGames, poolId, updateMatchInSpecifcPool, showScore }) => {



    // console.log('PoolItem.js - ', poolType, poolGames);
    return (
        <div className={styles.PoolItem}>
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
