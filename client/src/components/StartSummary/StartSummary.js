import React from 'react'
import PropTypes from 'prop-types';

import InputFloatingLabel from '../InputFloatingLabel/InputFloatingLabel';
import styles from './StartSummary.module.scss';

const TeamSummary = ({ values, emailValue, setEmailValue }) => {

    const { tournamentName, ...rest } = values;
    const teams = [];
    for (let team in rest) {
        teams.push(rest[team]);
    }


    return (
        <div className={styles.Summary}>
            <div className={styles.Header}>
                <span>Tournament titel:</span>
                <h3>{tournamentName}</h3>
            </div>
            <div className={styles.List}>
                <ul>
                    {teams.map((team, index) => (
                        <li key={index}>{team}</li>
                    ))}
                </ul>
            </div>
            <div className={styles.Info}>
                <p>When you start a new tournament you will get two links: one admin page to handle the tournament and one display page.</p>
                <p>Please enter your email below to get these links emailed to you. I will not use your email for anything else than to send you these links. If you somehow forget these links it's not possible to retrieve them again.</p>
                <div className={styles.Input}>
                    <InputFloatingLabel
                        inputValue={emailValue}
                        handleChange={(e) => setEmailValue(e.target.value)}
                        inputName="Email"
                        labelName="Enter your email here"
                        inputType="email"
                    />
                </div>
            </div>
        </div>
    )
}

TeamSummary.propTypes = {
    values: PropTypes.objectOf(PropTypes.string),
    emailValue: PropTypes.string,
    setEmailValue: PropTypes.func
}

export default TeamSummary
