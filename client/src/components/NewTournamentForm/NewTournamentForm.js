import React, { useState } from 'react'

import styles from './NewTournamentForm.module.scss';

import InputFloatingLabel from '../InputFloatingLabel/InputFloatingLabel';
import Modal from '../Modal/Modal';
import StartSummary from '../StartSummary/StartSummary';
import TournamentLinks from '../TournamentLinks/TournamentLinks';
import Spinner from '../Spinner/Spinner';


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

export const containsEmptyStrings = (obj) => {
    // check if any properties in the object is an empty string
    const isEmpty = Object.values(obj).map(val => val.trim()).some(x => x === '');
    return isEmpty;
};

export const containsDuplicate = (obj) => {
    // check if any properties in the tournament object containts duplicates
    // can't be two teams that has the same name

    // conatainDuplicate is true of there is NO duplicate and false if there is duplicate
    const containDuplicate = Object.values(obj).map(value => value.trim()).every((val, index, arr) => arr.indexOf(val) === index);
    // return opposite of value above
    return !containDuplicate;
}

const NewTournamentForm = () => {
    const [inputValue, setInputValue] = useState({ ...blankTournament });
    const [openModal, setOpenModal] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [returnData, setReturnData] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleChange = (e) => {
        setErrorMsg(false);
        setInputValue({ ...inputValue, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (containsEmptyStrings(inputValue)) {
            return setErrorMsg('All the fields must be filled out!');
        }

        if (containsDuplicate(inputValue)) {
            return setErrorMsg('Two teams can not be named the same')
        }

        setOpenModal(true)
    }



    const buildRequestObject = () => {
        console.log('NewTournamentForm.js - bygger objekt')
        setIsLoading(true);

        const { tournamentName, ...rest } = inputValue;

        // build new object to send to server
        const tournamentObject = {
            tournamentName,
            teams: [],
            email: emailValue
        };

        // push in the teams element (from rest) into object
        for (let team in rest) {
            tournamentObject.teams.push(rest[team]);
        }

        // console.log('[NewTournamentForm] - Turneringsobjekt: ', tournamentObject);
        postTournamentData(tournamentObject);
    }

    const postTournamentData = (data) => {
        console.log('NewTournamentForm.js - POSTAR')

        fetch(process.env.REACT_APP_CREATE_TOURNAMENT_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                // console.log('[NewTournamentForm] - result after fetch: ',result.savedTournament._id);
                setIsLoading(false);
                setInputValue({ ...blankTournament })
                setReturnData(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <>
            <form className={styles.Form} onSubmit={handleSubmit}>
                <div className={styles.InputGroup}>
                    <InputFloatingLabel inputName="tournamentName" inputValue={inputValue.tournamentName} handleChange={handleChange} fullWidth labelName="Name of the tournament" inputType="text" />
                </div>
                <div className={styles.InputGroup}>
                    <InputFloatingLabel inputName="teamOne" inputValue={inputValue.teamOne} handleChange={handleChange} labelName="Team #1" inputType="text" />
                    <InputFloatingLabel inputName="teamTwo" inputValue={inputValue.teamTwo} handleChange={handleChange} labelName="Team #2" inputType="text" />
                </div>
                <div className={styles.InputGroup}>
                    <InputFloatingLabel inputName="teamThree" inputValue={inputValue.teamThree} handleChange={handleChange} labelName="Team #3" inputType="text" />
                    <InputFloatingLabel inputName="teamFour" inputValue={inputValue.teamFour} handleChange={handleChange} labelName="Team #4" inputType="text" />
                </div>
                <div className={styles.InputGroup}>
                    <InputFloatingLabel inputName="teamFive" inputValue={inputValue.teamFive} handleChange={handleChange} labelName="Team #5" inputType="text" />
                    <InputFloatingLabel inputName="teamSix" inputValue={inputValue.teamSix} handleChange={handleChange} labelName="Team #6" inputType="text" />
                </div>
                <div className={styles.InputGroup}>
                    <InputFloatingLabel inputName="teamSeven" inputValue={inputValue.teamSeven} handleChange={handleChange} labelName="Team #7" inputType="text" />
                    <InputFloatingLabel inputName="teamEight" inputValue={inputValue.teamEight} handleChange={handleChange} labelName="Team #8" inputType="text" />
                </div>
                <div className={styles.InputGroup}>
                    <InputFloatingLabel inputName="teamNine" inputValue={inputValue.teamNine} handleChange={handleChange} labelName="Team #9" inputType="text" />
                    <InputFloatingLabel inputName="teamTen" inputValue={inputValue.teamTen} handleChange={handleChange} labelName="Team #10" inputType="text" />
                </div>
                <div className={styles.InputGroup}>
                    <InputFloatingLabel inputName="teamEleven" inputValue={inputValue.teamEleven} handleChange={handleChange} labelName="Team #11" inputType="text" />
                    <InputFloatingLabel inputName="teamTwelve" inputValue={inputValue.teamTwelve} handleChange={handleChange} labelName="Team #12" inputType="text" />
                </div>
                <div className={styles.InputGroup}>
                    <InputFloatingLabel inputName="teamThirteen" inputValue={inputValue.teamThirteen} handleChange={handleChange} labelName="Team #13" inputType="text" />
                    <InputFloatingLabel inputName="teamFourteen" inputValue={inputValue.teamFourteen} handleChange={handleChange} labelName="Team #14" inputType="text" />
                </div>
                <div className={styles.InputGroup}>
                    <InputFloatingLabel inputName="teamFiftheen" inputValue={inputValue.teamFiftheen} handleChange={handleChange} labelName="Team #15" inputType="text" />
                    <InputFloatingLabel inputName="teamSixteen" inputValue={inputValue.teamSixteen} handleChange={handleChange} labelName="Team #16" inputType="text" />
                </div>
                <input type="submit" value="Next" />
                {errorMsg && <p className={styles.ErrorMsg}>{errorMsg}</p>}
            </form>

            {openModal && (
                <Modal
                    setOpen={setOpenModal}
                    open={openModal}
                    closeModal={setOpenModal}
                    sendRequest={buildRequestObject}
                    hideButtons={isLoading || returnData ? true : false}
                >
                    {!isLoading ? // if isLoading is false
                        !returnData ? ( // if returnData is null/false -> show StartSummary
                            <StartSummary
                                values={{ ...inputValue }}
                                emailValue={emailValue}
                                setEmailValue={setEmailValue}
                            />
                            // Else show the returnData
                        ) : (
                                <TournamentLinks
                                    tournamentId={returnData.savedTournament._id}
                                    authId={returnData.savedTournament.authId}
                                />
                            )
                        : (
                            // Else show spinner
                            <Spinner />
                        )}

                </Modal>
            )}

        </>
    )
}

export default NewTournamentForm
