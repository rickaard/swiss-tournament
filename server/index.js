// PACKET IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const cors = require('cors');
const http = require('http');
const shortId = require('shortid');

// SETUP ENV VARIABELS
require('dotenv').config();

// CONFIGURE EXPRESS APP
const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = socketIO(server);

// UTILS
const poolDivider = require('./utils/utils');

// Connect to DB
mongoose.connect(
    process.env.MONGODB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    () => console.log('Connected to DB')
);

// IMPORT MONGODB-SCHEMA
const Tournament = require('./models/Tournament');


app.get('/', (req, res) => {
    console.log(req);
    res.send({ message: 'yey' });
})



app.post('/create-tournament', async (req, res) => {

    // FIXA VALIDERING!!! @HAPI/JOI???

    const { tournamentName, teams, email } = req.body;
    console.log(email)
    console.log(teams);

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
        ]
    });

    // res.send({tournament, email});

    // Save to DB
    try {
        const savedTournament = await tournament.save();
        console.log('NY TURNERING SPARAD TILL DATABAS!');
        res.send({ savedTournament });
    } catch (error) {
        res.status(400).send(error);
    }
})


app.get('/tournament/:id', (req, res) => {
    console.log('Client requested a tournament document');

    Tournament.findById(req.params.id, (error, tournament) => {
        if (error) return res.status(500).send(error);
        return res.status(200).send({ tournament });
    })
})


const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));