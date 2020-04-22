import React, { useState } from 'react'

import styles from './NewTournamentForm.module.scss';

import InputFloatingLabel from '../InputFloatingLabel/InputFloatingLabel';

const blankTournament = {
    tournamentName: '',
    teamOne: '',
    teamTwo: '',
    teamThree: '',
    teamFour: '',
    teamFive: '',
    teamSix: '',
    teamSeven: '',
    teamEight: '',
    teamNine: '',
    teamTen: '',
    teamEleven: '',
    teamTwelve: '',
    teamThirteen: '',
    teamFourteen: '',
    teamFiftheen: '',
    teamSixteen: '',
}

const NewTournamentForm = () => {
    const [inputValue, setInputValue] = useState({ ...blankTournament });

    const handleChange = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputValue);
    }

    return (
        <form className={styles.Form} onSubmit={handleSubmit}>
            <div className={styles.InputGroup}>
                <InputFloatingLabel inputName="tournamentName" inputValue={inputValue.tournamentName} handleChange={handleChange} fullWidth labelName="Name of the tournament" />
            </div>
            <div className={styles.InputGroup}>
                <InputFloatingLabel inputName="teamOne" inputValue={inputValue.teamOne} handleChange={handleChange} labelName="Team #1" />
                <InputFloatingLabel inputName="teamTwo" inputValue={inputValue.teamTwo} handleChange={handleChange} labelName="Team #2" />
            </div>
            <div className={styles.InputGroup}>
                <InputFloatingLabel inputName="teamThree" inputValue={inputValue.teamThree} handleChange={handleChange} labelName="Team #3" />
                <InputFloatingLabel inputName="teamFour" inputValue={inputValue.teamFour} handleChange={handleChange} labelName="Team #4" />
            </div>
            <div className={styles.InputGroup}>
                <InputFloatingLabel inputName="teamFive" inputValue={inputValue.teamFive} handleChange={handleChange} labelName="Team #5" />
                <InputFloatingLabel inputName="teamSix" inputValue={inputValue.teamSix} handleChange={handleChange} labelName="Team #6" />
            </div>
            <div className={styles.InputGroup}>
                <InputFloatingLabel inputName="teamSeven" inputValue={inputValue.teamSeven} handleChange={handleChange} labelName="Team #7" />
                <InputFloatingLabel inputName="teamEight" inputValue={inputValue.teamEight} handleChange={handleChange} labelName="Team #8" />
            </div>
            <div className={styles.InputGroup}>
                <InputFloatingLabel inputName="teamNine" inputValue={inputValue.teamNine} handleChange={handleChange} labelName="Team #9" />
                <InputFloatingLabel inputName="teamTen" inputValue={inputValue.teamTen} handleChange={handleChange} labelName="Team #10" />
            </div>
            <div className={styles.InputGroup}>
                <InputFloatingLabel inputName="teamEleven" inputValue={inputValue.teamEleven} handleChange={handleChange} labelName="Team #11" />
                <InputFloatingLabel inputName="teamTwelve" inputValue={inputValue.teamTwelve} handleChange={handleChange} labelName="Team #12" />
            </div>
            <div className={styles.InputGroup}>
                <InputFloatingLabel inputName="teamThirteen" inputValue={inputValue.teamThirteen} handleChange={handleChange} labelName="Team #13" />
                <InputFloatingLabel inputName="teamFourteen" inputValue={inputValue.teamFourteen} handleChange={handleChange} labelName="Team #14" />
            </div>
            <div className={styles.InputGroup}>
                <InputFloatingLabel inputName="teamFiftheen" inputValue={inputValue.teamFiftheen} handleChange={handleChange} labelName="Team #15" />
                <InputFloatingLabel inputName="teamSixteen" inputValue={inputValue.teamSixteen} handleChange={handleChange} labelName="Team #16" />
            </div>
            <input type="submit" value="Start" />
        </form>
    )
}

export default NewTournamentForm
