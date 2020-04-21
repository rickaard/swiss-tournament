import React, { useState } from 'react'

import styles from './NewTournamentForm.module.scss';

import InputFloatingLabel from '../InputFloatingLabel/InputFloatingLabel';

const blankTournament = {
    tournamentName: '',
    teamOne: '',
    teamTwo: ''
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
            <InputFloatingLabel inputName="tournamentName" inputValue={inputValue.tournamentName} handleChange={handleChange} labelName="Name of the tournament"/>
            <InputFloatingLabel inputName="teamOne" inputValue={inputValue.teamOne} handleChange={handleChange} labelName="Team #1"/>
            <InputFloatingLabel inputName="teamTwo" inputValue={inputValue.teamTwo} handleChange={handleChange} labelName="Team #2"/>
            <input type="submit" value="Skicka" />
        </form>
    )
}

export default NewTournamentForm
