import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import styles from './Modal.module.scss';

const Modal = ({ children, setOpen, open, closeModal, sendRequest, hideButtons }) => {

    useEffect(() => {
        disableBodyScroll(document.body);
        return () => {
            clearAllBodyScrollLocks();
        }
    }, [open])

    return (
        <>
            <div className={styles.Backdrop} onClick={() => setOpen(false)}></div>
            <div className={styles.Modal}>
                <div className={styles.ModalChildren}>
                    {children}
                </div>
                {!hideButtons && (
                    <div className={styles.ModalButtons}>
                        <button className={styles.CancelButton} onClick={() => closeModal(false)}>Cancel</button>
                        <button className={styles.SuccessButton} onClick={sendRequest}>Start</button>
                    </div>
                )}

            </div>
        </>
    )
}

Modal.propTypes = {
    children: PropTypes.node,
    setOpen: PropTypes.func,
    open: PropTypes.bool,
    closeModal: PropTypes.func,
    sendRequest: PropTypes.func,
    hideButtons: PropTypes.bool
}


export default Modal
