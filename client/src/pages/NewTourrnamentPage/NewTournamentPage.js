import React from 'react'
import NewTournamentForm from '../../components/NewTournamentForm/NewTournamentForm';
// import io from 'socket.io-client';

import styles from './NewTourrnamentPage.module.scss';

const NewTournament = () => {

    // useEffect(() => {
    //     let socket = io('http://localhost:3001/tournament/');
        
    //     socket.on('FromAPI', data => console.log(data));

    //     return () => {
    //         socket.emit('disconnected');
    //         socket.off();
    //     }
    // }, [])


    return (
        <div className={styles.Container}>

            <div className={styles.ContentWrapper}>
                <h1>Create a new tournament</h1>
                <NewTournamentForm />
            </div>

        </div>
    )
}

export default NewTournament
