const express = require('express');
const router = express.Router();
const shortId = require('shortid');

const Tournament = require('./models/Tournament');
const poolDivider = require('./utils/utils');

router.get('/', (req, res) => {
    res.send({ message: 'yey' });
});

router.post('/create-tournament', async (req, res) => {

    // FIXA VALIDERING!!! @HAPI/JOI???
    // FIXA MEJL-UTSKICK

    const { tournamentName, teams, email } = req.body;
    // console.log(email)
    // console.log(teams);

    // shuffle teams array and divide into first pool
    const gamesArray = poolDivider(teams);
    const generatedId = shortId.generate();
    console.log('genererad auth id: ', generatedId);

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
        const savedTournament = await tournament.save();
        console.log('NY TURNERING SPARAD TILL DATABAS!');
        res.send({ savedTournament });
    } catch (error) {
        res.status(400).send(error);
    }
});

// router.put('/tournament/:id', (req, res) => {
//     // console.log('tournamentId: ', req.params.id);
//     const { id } = req.params;
//     const { teams, pools, matchResult } = req.body;

//     Tournament.findByIdAndUpdate(id, { teams: teams, pools: pools }, (error, tournament) => {
//         if (error) return res.status(500).send(error);
//         console.log('DB uppdaterad!');
//         return res.status(202).send({ message: 'Tournament updated', status: 'OK', matchResult })
//     })
// })

// app.get('/tournament/:id', (req, res) => {
//     console.log('Client requested a tournament document');

//     Tournament.findById(req.params.id, (error, tournament) => {
//         if (error) return res.status(500).send(error);
//         return res.status(200).send({ tournament });
//     })
// })

module.exports = router;