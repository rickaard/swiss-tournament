import React from 'react';
import { useParams } from 'react-router-dom';

const Tournament = () => {
    let { id } = useParams();
    console.log(id);

    return (
        <div>
            <h1>Tournament page id: {id}</h1>
        </div>
    )
}

export default Tournament
