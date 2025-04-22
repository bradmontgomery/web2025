import React from 'react';

import './Hello.css';

function Hello() {

    const now = new Date();

    return (
        <h1 className="hello">
            Hello World!
            It's {now.toDateString()}
        </h1>
    )
}

export default Hello;