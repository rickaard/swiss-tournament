const mongodb = {
    tournamentName: "tournament",
    teams: [
      {
        name: 'Zerowin',
        wins: 0,
        losses: 1
      },
      {
        name: 'PIMPs',
        wins: 1,
        losses: 0
      }
    ],
    pools: [
      {
        round: 1,
        wins: 0,
        losses: 0,
        type: '0-0',
        games: [
          {
            home: "PIMPs",
            away: "Zerowin",
            homeScore: 10,
            awayScore: 8
          },
          {
            home: "team2",
            away: "anonym",
            homeScore: 7,
            awayScore: 10
          }
        ]
      },

      {
        round: 2,
        type: '1-0',
        wins: 1,
        losses: 0,
        games: [
          {
            home: "PIMPs",
            away: "anonym",
            homeScore: undefined,
            awayScore: undefined
          }
        ]
      },
      {
        round: 2,
        type: '0-1',
        wins: 0,
        losses: 1,
        games: [
          {
            home: "Zerowin",
            away: "team2",
            homeScore: undefined,
            awayScore: undefined
          }
        ]
      },
    ]
  }