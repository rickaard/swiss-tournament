import React, { useEffect } from 'react';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';


import styles from './DisplayResultModal.module.scss';

const DisplayResultModal = ({ isOpen, setIsOpen, matchResultData }) => {

    useEffect(() => {
        disableBodyScroll(document.body);
        return () => {
            clearAllBodyScrollLocks();
        }
    }, [isOpen])


    return (
        <>
            <div className={styles.Backdrop} onClick={() => setIsOpen(false)}></div>
            <div className={styles.Modal}>
                <div className={styles.ResultWrapper}>
                    <p className={styles.HomeTeam}>{matchResultData.home}</p>
                    <div className={styles.ScoreWrapper}>
                        <span className={styles.ScoreItem}>{matchResultData.homeScore}</span>
                        <span className={styles.Divider}>:</span>
                        <span className={styles.ScoreItem}>{matchResultData.awayScore}</span>
                    </div>
                    <p className={styles.AwayTeam}>{matchResultData.away}</p>
                </div>
            </div>
        </>
    )
}

export default DisplayResultModal
