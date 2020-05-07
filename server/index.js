// PACKET IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const cors = require('cors');
const http = require('http');
const shortId = require('shortid');

const router = require('./router');

// SETUP ENV VARIABELS
require('dotenv').config();

// CONFIGURE EXPRESS APP
const app = express();


const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());
app.use(cors());
app.use(router);


// UTILS
const poolDivider = require('./utils/utils');

// Connect to DB
mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    () => console.log('Connected to DB')
);

// IMPORT MONGODB-SCHEMA
const Tournament = require('./models/Tournament');


//
let interval;
io.on('connect', (socket) => {
    console.log('We have a new connection');

    socket.on('join', ({ tournamentId }, callback) => {

        Tournament.findById(tournamentId, (error, tournament) => {
            if (error) return callback(error); // if no tournament is found, call callback with argument error and return from function

            socket.emit('tournament', tournament); // emit the tornament object that is fetched from DB
            socket.join(tournamentId); // join tournament "room"
        });

    })

    socket.on('update-match', (data, callback) => {
        const { teams, pools, matchResult, tournamentId } = data.tournamentObj;

        Tournament.findByIdAndUpdate(tournamentId, { teams: teams, pools: pools }, { new: true }, (error, tournament) => {
            if (error) return callback(error);

            console.log('DB uppdaterad!');
            // emit to everyone in the same "room" except the socket client that is active
            socket.broadcast.to(tournamentId).emit('match-updated', { tournament, matchResult });
            callback();
        })
    })


})

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));