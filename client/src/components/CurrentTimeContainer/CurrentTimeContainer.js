import React, { useState, useEffect } from 'react';

import styles from './CurrentTimeContainer.module.scss';

const getTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const CurrentTimeContainer = (props) => {
    const [currentTime, setCurrentTime] = useState(getTime());

    useEffect(() => {
        const timerId = setInterval(
            () => setCurrentTime(getTime()), 1000);

        return () => clearInterval(timerId);
    }, [])


    return (
        <div className={styles.CurrentTimeContainer} onClick={props.onClick}>
            <span className={styles.Text}>Current Time:</span>
            <span className={styles.Time}>{currentTime}</span>
        </div>
    )
}

export default CurrentTimeContainer
