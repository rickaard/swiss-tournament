import { useState, useEffect } from 'react';

const useAllowedToGenerateNextRound = (isAdmin, pools, currentRound) => {
    const [canGenerateRound, setCanGenerateRound] = useState(false);

    useEffect(() => {
        if (isAdmin) {
            const anyMatchNotDone = pools
                .filter(poolRound => poolRound.round === currentRound)
                .reduce((total, pool) => total.concat(pool.games), [])
                .some(matchup => matchup.homeScore === 0 && matchup.awayScore === 0);

            setCanGenerateRound(!anyMatchNotDone);
        }
    }, [pools, currentRound, isAdmin]);

    useEffect(() => {
        console.log('useAllowHook');
    });

    return canGenerateRound;
}

export default useAllowedToGenerateNextRound;