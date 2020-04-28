import React, { useContext, useState } from 'react'
import { AuthContext } from '../../utils/TournamentContext';

import UpdateMatchModal from '../UptadeMatchModal/UpdateMatchModal';
import UpdateMatchContainer from '../UpdateMatchContainer/UpdateMatchContainer';
import styles from './MatchUpContainer.module.scss';

const MatchUpContainer = ({ game }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    // console.log('MatchUpContainer.js - isAuthenticated: ', isAuthenticated);
    console.log('MatchUpContainer.js - game: ', game);


    // const handleAdminClick = !isAuthenticated ? null : () => console.log('Klickat på match - adminläge');
    const handleAdminClick = !isAuthenticated ? null : () => setIsModalOpen(true);

    const updateMatch = () => {
        console.log('MatchUpContainer.js - UPPDATERAT MATCH!');
        setIsModalOpen(false);
    }

    let attachedClassNames = [styles.MatchUp];
    if (isAuthenticated) {
        attachedClassNames.push(styles.AdminMatchUp);
    }

    return (
        <>
            <div className={attachedClassNames.join(' ')} onClick={handleAdminClick} >
                <div className={styles.HomeTeam}>{game.home}</div>
                <span className={styles.VersusText}>VS</span>
                <div className={styles.AwayTeam}>{game.away}</div>
            </div>
            {isModalOpen && (
                <UpdateMatchModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    updateMatch={updateMatch}
                >
                    <UpdateMatchContainer
                        currentGame={game}
                    />
                </UpdateMatchModal>
            )}
        </>
    )
}

export default MatchUpContainer
