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
            // if error call the callback with error passed as argument so socket client knows something went wrong
            if (error) return callback(error);

            // emit to everyone in the same "room" except the socket client that is active
            socket.broadcast.to(tournamentId).emit('match-updated', { tournament, matchResult });
            // call the callback so the socket client knows the everything went fine
            callback();
        })
    })

    socket.on('generate-next-round', async ({ currentRound, tournamentId }, callback) => {
        // currentRound berättar vilken runda som HAR spelats, t.ex. round = 1
        const fetchTournamentFromDB = async () => {
            return Tournament.findById(tournamentId).lean().exec();
        };

        const tournament = await fetchTournamentFromDB();


        switch (currentRound) {
            case (1): {
                console.log('currentRound is 1: ', currentRound);
                // GENERATE THE SECOND ROUND

                // FILTER OUT THE TEAMS THAT WILL GO TO EACH POOL: [1-0], [0-1]
                const oneZeroTeam = tournament.teams.filter(team => team.wins === 1 && team.losses === 0).map(team => team.name); 
                const zeroOneTeam = tournament.teams.filter(team => team.losses === 1 && team.wins === 0).map(team => team.name); 

                // RANDOMIZE AND CONSTRUCT THE MATCHUPS IN EACH POOL ROUND
                const oneZeroPool = poolDivider(oneZeroTeam);
                const zeroOnePool = poolDivider(zeroOneTeam);

                // FIND THE CORRECT POOLS AND UPDATE IT WITH THE NEW GENERATED POOLS
                const updatedPools = tournament.pools.map(pool => {
                    if (pool.poolType === '1-0') {
                        return { ...pool, games: oneZeroPool }
                    }

                    if (pool.poolType === '0-1') {
                        return { ...pool, games: zeroOnePool }
                    }

                    return pool;
                });
                Tournament.findByIdAndUpdate(tournamentId, { pools: updatedPools, currentRound: currentRound + 1 }, { new: true }, (error, tournament) => {
                    // if there is any error while updated DB call the callback with error parameter
                    // dont emit the socket
                    if (error) return callback(error);
                    // emit to everyone the newly updated tournament document
                    io.to(tournamentId).emit('next-round-generated', tournament);
                })
                break;
            }

            case (2): {
                // GENERATE THE THIRD ROUND
                console.log('currentRound is 2: ', currentRound);

                // FILTER OUT THE TEAMS THAT WILL GO TO EACH POOL: [2-0], [1-1], [0-2]
                // ONLY RETURN THE TEAM NAME
                const twoZeroTeams = tournament.teams.filter(team => team.wins === 2 && team.losses == 0).map(team => team.name);
                const oneOneTeams = tournament.teams.filter(team => team.wins === 1 && team.losses === 1).map(team => team.name);
                const zeroTwoTeams = tournament.teams.filter(team => team.wins === 0 && team.losses === 2).map(team => team.name);

                // CONSTRUCT THE MATCHUPS
                const twoZeroPool = poolDivider(twoZeroTeams);
                const oneOnePool = poolDivider(oneOneTeams);
                const zeroTwoPool = poolDivider(zeroTwoTeams);

                // FIND THE CORRECT POOLS AND UPDATE IT WITH THE NEW GENERATED POOLS
                const updatedPools = tournament.pools.map(pool => {
                    if (pool.poolType === '2-0') {
                        return { ...pool, games: twoZeroPool }
                    }
                    if (pool.poolType === '1-1') {
                        return { ...pool, games: oneOnePool }
                    }
                    if (pool.poolType === '0-2') {
                        return { ...pool, games: zeroTwoPool }
                    }
                    return pool;
                });

                Tournament.findByIdAndUpdate(tournamentId, { pools: updatedPools, currentRound: currentRound + 1 }, { new: true }, (error, tournament) => {
                    if (error) return callback(error);
                    io.to(tournamentId).emit('next-round-generated', tournament);
                })

                break;
            }

            case (3): {
                // GENERATE THE FORTH ROUND
                console.log('currentRound is 3: ', currentRound);

                const twoOneTeams = tournament.teams.filter(team => team.wins === 2 && team.losses === 1).map(team => team.name);
                const oneTwoTeams = tournament.teams.filter(team => team.wins === 1 && team.losses === 2).map(team => team.name);

                const twoOnePool = poolDivider(twoOneTeams);
                const oneTwoPool = poolDivider(oneTwoTeams);

                const updatedPools = tournament.pools.map(pool => {
                    if (pool.poolType === '2-1') {
                        return { ...pool, games: twoOnePool }
                    }
                    if (pool.poolType === '1-2') {
                        return { ...pool, games: oneTwoPool }
                    }
                    return pool;
                });

                Tournament.findByIdAndUpdate(tournamentId, { pools: updatedPools, currentRound: currentRound + 1 }, { new: true }, (error, tournament) => {
                    if (error) return callback(error);
                    io.to(tournamentId).emit('next-round-generated', tournament);
                });

                break;
            }
            case (4): {
                // GENERATE THE FIFTH / LAST ROUND IN SWISS FORMAT
                console.log('currentRound is 4: ', currentRound);

                const twoTwoTeams = tournament.teams.filter(team => team.wins === 2 && team.losses === 2).map(team => team.name);

                const twoTwoPool = poolDivider(twoTwoTeams);

                const updatedPools = tournament.pools.map(pool => {
                    if (pool.poolType === '2-2') {
                        return { ...pool, games: twoTwoPool }
                    }
                    return pool;
                });

                Tournament.findByIdAndUpdate(tournamentId, { pools: updatedPools, currentRound: currentRound + 1 }, { new: true }, (error, tournament) => {
                    if (error) return callback(error);
                    io.to(tournamentId).emit('next-round-generated', tournament);
                });

                break;
            }
            case (5): {
                // GENERATE THE QUARTER FINAL
                console.log('currentRound is 5: ', currentRound);

                // GET ALL THE TEAMS THAT HAVE 3 WINS, I.E. HAVE ADVANCED TO THE PLAYOFF
                const quarterFinalTeams = tournament.teams.filter(team => team.wins === 3).map(team => team.name);
                // GENERATE THE "POOL" ROUND FOR QUARTER FINALS
                const quarterFinalPool = poolDivider(quarterFinalTeams);

                const updatedPools = tournament.pools.map(pool => {
                    if (pool.poolType === 'Quarter Final') {
                        return { ...pool, games: quarterFinalPool }
                    };
                    return pool;
                });

                Tournament.findByIdAndUpdate(tournamentId, { pools: updatedPools, currentRound: currentRound + 1 }, { new: true }, (error, tournament) => {
                    if (error) return callback(error);
                    io.to(tournamentId).emit('playoffs-init', tournament)
                });

                break;
            }
            case (6): {
                // GENERATE THE SEMI FINAL
                console.log('currentRound is Quarter Final / 6: ', currentRound);

                // GET ALL THE TEAMS THAT HAVE 4 WINS
                const semiFinalTeams = tournament.teams.filter(team => team.wins === 4).map(team => team.name);
                // GENERATE THE "POOL" ROUND FOR SEMI FINAL
                const semiFinalPool = poolDivider(semiFinalTeams);

                const updatedPools = tournament.pools.map(pool => {
                    if (pool.poolType === 'Semi Final') {
                        return { ...pool, games: semiFinalPool }
                    };
                    return pool;
                });

                Tournament.findByIdAndUpdate(tournamentId, { pools: updatedPools, currentRound: currentRound + 1 }, { new: true }, (error, tournament) => {
                    if (error) return callback(error);
                    io.to(tournamentId).emit('playoffs-updated', tournament);
                });

                break;
            }
            case (7): {
                // GENERATE THE GRAND FINAL
                console.log('currentRound is Semi Final / 7: ', currentRound);

                // GET ALL THE TEAMS THAT HAVE 5 WINS, I.E. IS ADVANCED TO THE GRAND FINAL
                const grandFinalTeams = tournament.teams.filter(team => team.wins === 5).map(team => team.name);
                const grandFinalPool = poolDivider(grandFinalTeams);

                const updatedPools = tournament.pools.map(pool => {
                    if (pool.poolType === 'Grand Final') {
                        return { ...pool, games: grandFinalPool }
                    };
                    return pool;
                });

                Tournament.findByIdAndUpdate(tournamentId, { pools: updatedPools, currentRound: currentRound + 1 }, { new: true }, (error, tournament) => {
                    if (error) return callback(error);
                    io.to(tournamentId).emit('playoffs-updated', tournament);
                });

                break;
            }

            default:
                break;
        }

    });

    socket.on('disconnect', () => {
        console.log('Client has disconnected');
    })


})

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));