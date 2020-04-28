import React from 'react';
import PropTypes from 'prop-types';
import styles from './UpdateMatchContainer.module.scss';

const UpdateMatchContainer = ({ currentGame }) => {
    console.log('UpdateMatchContainer.js, inne i Modal, current game: ', currentGame);
    return (
        <div className={styles.UpdateContainer}>
            <form>
                <div className={styles.InputGroup}>
                    <label htmlFor="home">{currentGame.home}</label>
                    <input
                        type="number"
                        name="home"
                        defaultValue={currentGame.homeScore}
                        onChange={() => 'UpdateMatchContainer.js - uppdaterar home input'}
                    />
                </div>
                <div className={styles.InputGroup}>
                    <label htmlFor="away">{currentGame.away}</label>
                    <input
                        type="number"
                        name="away"
                        defaultValue={currentGame.awayScore}
                        onChange={() => 'UpdateMatchContainer.js - uppdaterar away input'}
                    />
                </div>
            </form>
        </div>
    )
}

UpdateMatchContainer.propTypes = {
    currentGame: PropTypes.object
};

export default UpdateMatchContainer
