const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    tournamentName: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    teams: [
        {
            name: String,
            wins: Number,
            losses: Number
        }
    ],
    pools: [
        {
            round: Number,
            wins: Number,
            losses: Number,
            poolType: String,
            games: [
                {
                    home: String,
                    away: String,
                    homeScore: Number,
                    awayScore: Number
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Tournament', tournamentSchema);


