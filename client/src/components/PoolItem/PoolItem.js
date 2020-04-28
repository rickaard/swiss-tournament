import React, { useContext } from 'react';
// import { AuthContext } from '../../utils/TournamentContext';


import MatchUpContainer from '../MatchUpContainer/MatchUpContainer';
import styles from './PoolItem.module.scss';

const PoolItem = ({ poolType, poolGames }) => {
    // const { isAuthenticated } = useContext(AuthContext);
    // console.log('PoolItem.js - isAuthenticated: ', isAuthenticated);


    console.log('PoolItem.js - ', poolType, poolGames);
    return (
        <div className={styles.PoolItem}>
            <h3 className={styles.PoolType}>{poolType}</h3>
            <div className={styles.GamesWrapper}>
                {poolGames.map((game, index) => (
                    <MatchUpContainer
                        key={index}
                        game={game}
                    />
                ))}
            </div>
        </div>
    )
}

export default PoolItem
