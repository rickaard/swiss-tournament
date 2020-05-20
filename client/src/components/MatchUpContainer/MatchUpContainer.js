import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../utils/TournamentContext';

import UpdateMatchModal from '../UptadeMatchModal/UpdateMatchModal';
import UpdateMatchContainer from '../UpdateMatchContainer/UpdateMatchContainer';
import styles from './MatchUpContainer.module.scss';

const MatchUpContainer = ({ game, poolId, updateMatchInSpecifcPool, showScore }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [matchId, setMatchId] = useState(game._id);
    const [homeTeam, setHomeTeam] = useState({ home: game.home, homeScore: game.homeScore }); // set state from props
    const [awayTeam, setAwayTeam] = useState({ away: game.away, awayScore: game.awayScore }); // set state from props
    const [errorMsg, setErrorMsg] = useState('');

    const handleAdminClick = !isAuthenticated ? null : () => setIsModalOpen(true);

    useEffect(() => {
        setHomeTeam({ home: game.home, homeScore: game.homeScore });
        setAwayTeam({ away: game.away, awayScore: game.awayScore });
        setMatchId(game._id);
    }, [game]);

    const updateMatch = () => {

        // Parse the input state to decimals (maybe some kind of games/sports need to use decimal scores?)
        const homeScore = parseFloat(homeTeam.homeScore);
        const awayScore = parseFloat(awayTeam.awayScore);
        // Make sure they are numbers and not some wierd characters
        if (isNaN(homeScore) || isNaN(awayScore)) {
            setErrorMsg('Score must be a number');
            return;
        }
        // Make sure it's not a draw, not allowed in a Swiss format
        if (homeScore === awayScore) {
            setErrorMsg(`It can't be a draw`);
            return;
        }

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

    // console.log('MatchUpContainer.js')

    return (
        <>
            <div className={attachedClassNames.join(' ')} onClick={handleAdminClick} >
                <div className={homeTeamClassNames.join(' ')}><p>{!showScore ? game.home : showScoreOrNot(game.home, game.homeScore)}</p></div>
                <span className={styles.VersusText}>VS</span>
                <div className={awayTeamClassNames.join(' ')}><p>{!showScore ? game.away : showScoreOrNot(game.away, game.awayScore)}</p></div>
            </div>
            {isModalOpen && (
                <UpdateMatchModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    updateMatch={updateMatch}
                    allowUpdate={game.homeScore === 0 && game.awayScore === 0 ? true : false}
                    setErrorMsg={setErrorMsg}
                >
                    <UpdateMatchContainer
                        home={homeTeam}
                        away={awayTeam}
                        changeHomeScore={setHomeTeam}
                        changeAwayScore={setAwayTeam}
                        allowUpdate={game.homeScore === 0 && game.awayScore === 0 ? true : false}
                        errorMsg={errorMsg}
                        setErrorMsg={setErrorMsg}
                    />
                </UpdateMatchModal>
            )}
        </>
    )
}

export default MatchUpContainer
