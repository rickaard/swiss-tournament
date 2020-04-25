const arrayShuffler = (array) => {
    const newArray = [...array];

    let currentIndex = newArray.length;
    let temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = newArray[currentIndex];
        newArray[currentIndex] = newArray[randomIndex];
        newArray[randomIndex] = temporaryValue;
    }
    return newArray;
}

const poolDivider = (array) => {
    const randomTeamArray = arrayShuffler(array);
    // console.log('Efter shuffle: ', randomTeamArray);
    
    const gamesArray = [];
    for (let i = 0; i < randomTeamArray.length; i = i+2) {
        gamesArray.push({
            home: randomTeamArray[i],
            away: randomTeamArray[i+1],
            homeScore: 0,
            awayScore: 0
        })
    };
    return gamesArray;
}


module.exports = poolDivider;