import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import styles from './UpdateMatchModal.module.scss';

const UpdateMatchModal = ({ isOpen, setIsOpen, updateMatch, children }) => {

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
                {children}
                <div className={styles.ModalButtons}>
                    <button className={styles.CancelButton} onClick={() => setIsOpen(false)}>Cancel</button>
                    <button className={styles.SuccessButton} onClick={updateMatch}>Update</button>
                </div>
            </div>
        </>
    )
}

UpdateMatchModal.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    updateMatch: PropTypes.func,
    children: PropTypes.node
}

export default UpdateMatchModal
