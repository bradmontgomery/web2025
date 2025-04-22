import { useState } from 'react';

import './Clock.css';

function Clock(props) {
    // Functions to get current date & time
    const getNow = () => new Date();
    const getTime = () => getNow().toLocaleTimeString(props.locale);
    const getDate = () => getNow().toLocaleDateString(props.locale);

    // Hooks for the state of the clock
    const [currentTime, setCurrentTime] = useState(getTime());
    const [currentDate, setCurrentDate] = useState(getDate());

    setInterval(() => {
        setCurrentTime(getTime());
        setCurrentDate(getDate());
    }, 1000); // wait 1s, then call our set functions.

    let style = {}
    if (props.color) {
        style["color"] = props.color;
        style["borderColor"] = props.color;
    }

    return (
        <div className="clock" style={style}>
            <h2>{currentTime}</h2>
            <p>{currentDate}</p>
        </div>
    )
}

Clock.defaultProps = {
    locale: "en-US"
}

export default Clock;