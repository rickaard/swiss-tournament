import React, { useContext, useState } from 'react'
import { AuthContext } from '../../utils/TournamentContext';

import UpdateMatchModal from '../UptadeMatchModal/UpdateMatchModal';
import UpdateMatchContainer from '../UpdateMatchContainer/UpdateMatchContainer';
import styles from './MatchUpContainer.module.scss';

const MatchUpContainer = ({ game, poolId, updateMatchInSpecifcPool, showScore }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [matchId] = useState(game._id);
    const [homeTeam, setHomeTeam] = useState({ home: game.home, homeScore: game.homeScore }); // set state from props
    const [awayTeam, setAwayTeam] = useState({ away: game.away, awayScore: game.awayScore }); // set state from props
    // const [showScore, setShowScore] = useState(false);



    // useEffect(() => {
    //     const interval = setInterval(() => {

    //         setShowScore(true);
    //         setTimeout(() => {
    //             setShowScore(false);
    //         }, 2000)

    //     }, 10000);

    //     return () => clearInterval(interval);
    // }, [])


    // TESTA DENNA 
    // const nameTimeout = 10000;
    // const scoreTimeout = 2000;
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setShowScore(!showScore);
    //     }, showScore ? scoreTimeout : nameTimeout);
    //     return () => clearTimeout(timeout);
    // }, [showScore]);



    const handleAdminClick = !isAuthenticated ? null : () => setIsModalOpen(true);

    const updateMatch = () => {
        setIsModalOpen(false);

        const poolResult = {
            matchId,
            home: homeTeam.home,
            homeScore: homeTeam.homeScore,
            away: awayTeam.away,
            awayScore: awayTeam.awayScore
        }
        updateMatchInSpecifcPool(poolId, poolResult);
    }

    let attachedClassNames = [styles.MatchUp];
    if (isAuthenticated) {
        attachedClassNames.push(styles.AdminMatchUp);
    }

    let awayTeamClassNames = [styles.AwayTeam];
    if (game.awayScore > game.homeScore) {
        awayTeamClassNames.push(styles.ArrowUp);
    }
    if (game.awayScore < game.homeScore) {
        awayTeamClassNames.push(styles.ArrowDown);
    }

    let homeTeamClassNames = [styles.HomeTeam];
    if (game.homeScore > game.awayScore) {
        homeTeamClassNames.push(styles.ArrowUp);
    }
    if (game.homeScore < game.awayScore) {
        homeTeamClassNames.push(styles.ArrowDown);
    }

    const showScoreOrNot = (team, teamScore) => {
        if (game.homeScore === 0 && game.awayScore === 0) {
            return team;
        }
        return teamScore;

    }

    return (
        <>
            <div className={attachedClassNames.join(' ')} onClick={handleAdminClick} >
                <div className={homeTeamClassNames.join(' ')}><p>{!showScore ? game.home : showScoreOrNot(game.home,game.homeScore)}</p></div>
                {/* <div className={homeTeamClassNames.join(' ')}><p>{game.home}</p></div> */}
                <span className={styles.VersusText}>VS</span>
                <div className={awayTeamClassNames.join(' ')}><p>{!showScore ? game.away : showScoreOrNot(game.away, game.awayScore)}</p></div>
                {/* <div className={awayTeamClassNames.join(' ')}><p>{game.away}</p></div> */}
            </div>
            {isModalOpen && (
                <UpdateMatchModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    updateMatch={updateMatch}
                >
                    <UpdateMatchContainer
                        home={homeTeam}
                        away={awayTeam}
                        changeHomeScore={setHomeTeam}
                        changeAwayScore={setAwayTeam}
                    />
                </UpdateMatchModal>
            )}
        </>
    )
}

export default MatchUpContainer
