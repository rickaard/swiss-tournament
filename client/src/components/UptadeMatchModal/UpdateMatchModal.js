import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import styles from './UpdateMatchModal.module.scss';

const UpdateMatchModal = ({ isOpen, setIsOpen, updateMatch, children, allowUpdate, setErrorMsg }) => {

    useEffect(() => {
        disableBodyScroll(document.body);
        return () => {
            clearAllBodyScrollLocks();
        }
    }, [isOpen])


    return (
        <>
            <div className={styles.Backdrop} onClick={() => { setIsOpen(false); setErrorMsg('') }}></div>
            <div className={styles.Modal}>
                {children}
                <div className={styles.ModalButtons}>
                    <button className={styles.CancelButton} onClick={() => { setIsOpen(false); setErrorMsg('') }}>Cancel</button>
                    {allowUpdate ? <button className={styles.SuccessButton} onClick={updateMatch}>Update</button> : null}
                </div>
            </div>
        </>
    )
}

UpdateMatchModal.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    updateMatch: PropTypes.func,
    children: PropTypes.node,
    allowUpdate: PropTypes.bool,
    setErrorMsg: PropTypes.func
}

export default UpdateMatchModal
