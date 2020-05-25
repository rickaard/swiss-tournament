const express = require('express');
const router = express.Router();
const shortId = require('shortid');

const Tournament = require('./models/Tournament');
const poolDivider = require('./utils/utils');
const sendMailWithLinks = require('./mail');

router.get('/', (req, res) => {
    res.send({ message: 'yey' });
});

router.post('/create-tournament', async (req, res) => {
    console.log('router.js - Tar emot post-anrop')

    const { tournamentName, teams, email } = req.body;

    // shuffle teams array and divide into first pool
    const gamesArray = poolDivider(teams);
    const generatedId = shortId.generate();


    // Create a new tournament object
    const tournament = new Tournament({
        tournamentName,
        authId: generatedId,
        teams: teams.map(team => ({ name: team, wins: 0, losses: 0 })),
        pools: [
            {
                round: 1,
                wins: 0,
                losses: 0,
                poolType: '0-0',
                games: gamesArray
            },
            { round: 2, wins: 1, losses: 0, poolType: '1-0', games: [] },
            { round: 2, wins: 0, losses: 1, poolType: '0-1', games: [] },
            { round: 3, wins: 2, losses: 0, poolType: '2-0', games: [] },
            { round: 3, wins: 1, losses: 1, poolType: '1-1', games: [] },
            { round: 3, wins: 0, losses: 2, poolType: '0-2', games: [] },
            { round: 4, wins: 2, losses: 1, poolType: '2-1', games: [] },
            { round: 4, wins: 1, losses: 2, poolType: '1-2', games: [] },
            { round: 5, wins: 2, losses: 2, poolType: '2-2', games: [] },
            { round: 6, wins: 3, poolType: 'Quarter Final', games: [] },
            { round: 7, wins: 4, poolType: 'Semi Final', games: [] },
            { round: 8, wins: 5, poolType: 'Grand Final', games: [] }
        ],
        currentRound: 1
    });
    // Save to DB
    try {
        console.log('Försöker spara till DB')
        const savedTournament = await tournament.save();

        if (email) {
            sendMailWithLinks(email, savedTournament._id, savedTournament.authId);
        }

        console.log('NY TURNERING SPARAD TILL DATABAS!');
        res.send({ savedTournament });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;