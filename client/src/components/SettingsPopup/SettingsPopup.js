import React from 'react';
import PropTypes from 'prop-types';

import styles from './SettingsPopup.module.scss';

const SettingsPopup = ({ setIsOpen, children }) => {

    return (
        <>
            <div className={styles.Backdrop} onClick={() => setIsOpen(false)}></div>
            {children}
        </>
    )
}

SettingsPopup.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    children: PropTypes.node,
    generateNextRound: PropTypes.func
}

export default SettingsPopup
