import React from 'react';
import PropTypes from 'prop-types';
import styles from './UpdateMatchContainer.module.scss';

const UpdateMatchContainer = ({ home, changeHomeScore, away, changeAwayScore, allowUpdate }) => {
    // console.log('UpdateMatchContainer.js, inne i Modal, current game: ', currentGame);
    return (
        <div className={styles.UpdateContainer}>
            <form>
                <div className={styles.InputGroup}>
                    <label htmlFor="home">{home.home}</label>
                    {allowUpdate ? (
                        <input
                            type="number"
                            name="home"
                            min={0}
                            value={home.homeScore}
                            onChange={(e) => changeHomeScore({ ...home, homeScore: e.target.value })}
                        />
                    ) : <p>{home.homeScore}</p>}

                </div>
                <div className={styles.InputGroup}>
                    <label htmlFor="away">{away.away}</label>
                    {allowUpdate ? (
                        <input
                            type="number"
                            name="away"
                            min={0}
                            value={away.awayScore}
                            onChange={(e) => changeAwayScore({ ...away, awayScore: e.target.value })}
                        />
                    ) : <p>{away.awayScore}</p>}

                </div>
            </form>
        </div>
    )
}

UpdateMatchContainer.propTypes = {
    currentGame: PropTypes.object,
    allowUpdate: PropTypes.bool,
};

export default UpdateMatchContainer
