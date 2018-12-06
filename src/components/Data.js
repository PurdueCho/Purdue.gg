import React from 'react';
import PropTpyes from 'prop-types';

function Data ({title, value}) {
    return (
        <div className ="Movie">
            <div className = "Movie_Columns">
                <h1>{title}</h1>
                <div className="Movie_Synopsis">
                    {value}
                </div>

            </div>
        </div>
    )
}

Data.propTpyes = {
    title: PropTpyes.string.isRequired,
    value: PropTpyes.number.isRequired,
}

export default Data