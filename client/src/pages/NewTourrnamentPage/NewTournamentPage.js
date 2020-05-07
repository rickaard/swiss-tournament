import React, {useEffect} from 'react'
import NewTournamentForm from '../../components/NewTournamentForm/NewTournamentForm';
import io from 'socket.io-client';

import styles from './NewTourrnamentPage.module.scss';

const NewTournament = () => {

    useEffect(() => {
        console.log('NewTournamentPage.js - useEffect')
        let socket = io('http://localhost:3001/tournament/');
        
        socket.on('FromAPI', data => console.log(data));

        return () => {
            socket.emit('disconnected');
            socket.off();
        }
    }, [])
    // useEffect(() => {
    //     console.log('TournamentPage.js - useEffect')
    //     const socket = io('http://localhost:3001/', { transports: ['websockets, polling'] });
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
