import React from 'react';
import PropTypes from 'prop-types';
import styles from './UpdateMatchContainer.module.scss';

const UpdateMatchContainer = ({ home, changeHomeScore, away, changeAwayScore }) => {
    // console.log('UpdateMatchContainer.js, inne i Modal, current game: ', currentGame);
    return (
        <div className={styles.UpdateContainer}>
            <form>
                <div className={styles.InputGroup}>
                    <label htmlFor="home">{home.home}</label>
                    <input
                        type="number"
                        name="home"
                        min={0}
                        value={home.homeScore}
                        onChange={(e) => changeHomeScore({ ...home, homeScore: e.target.value })}
                    />
                </div>
                <div className={styles.InputGroup}>
                    <label htmlFor="away">{away.away}</label>
                    <input
                        type="number"
                        name="away"
                        min={0}
                        value={away.awayScore}
                        onChange={(e) => changeAwayScore({ ...away, awayScore: e.target.value })}
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
