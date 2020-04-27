import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types';

import styles from './PoolsWrapper.module.scss';

import PoolRoundWrapper from '../PoolRoundWrapper/PoolRoundWrapper';

const PoolsWrapper = ({ tournamentId, authId }) => {
    console.log('[PoolsWrapper.js] - TurneringsId: ', tournamentId);
    console.log('[PoolsWrapper.js] - authId: ', authId);

    useEffect(() => {
        fetch('http://localhost:3001/tournament/' + tournamentId)
        .then(response => response.json())
        .then(data => {
            console.log(data.tournament);
        })
        .catch(error => console.log(error))

    }, [])

    return (
        <div className={styles.PoolsWrapper}>
            <PoolRoundWrapper round={1}/>
            <PoolRoundWrapper round={2}/>
            <PoolRoundWrapper round={3}/>
            <PoolRoundWrapper round={4}/>
            <PoolRoundWrapper round={5}/>
        </div>
    )
}

PoolsWrapper.propTypes = {
    tournamentId: PropTypes.string,
    authId: PropTypes.string
}


export default PoolsWrapper
