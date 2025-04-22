import {useState, useEffect } from 'react';
import './Weather.css';

function Weather() {
    const [ lat, setLat ] = useState(null);
    const [ lon, setLon ] = useState(null);
    const [ periods, setPeriods ] = useState([]);
    const pointsApi = "https://api.weather.gov/points/";
    
    useEffect(() => {
        // On Geolocation success: Save the user's lat & lon
        const locationSuccess = (position)  => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const url = pointsApi + `${latitude},${longitude}`;

            const request = new Request(url);
            fetch(request).then((response) => response.json())
                .then((json) => {
                    console.log("Got Points Data: ", json)
                    const forecastUrl = json.properties.forecast;
                    // https://api.weather.gov/gridpoints/MEG/49,71/forecast"

                    const forecastRequest = new Request(forecastUrl);
                    fetch(forecastRequest).then((response) => response.json())
                        .then((json) => {
                            console.log("Forecast Data: ", json)
                            // Only set all my state variables at the last minute.
                            setPeriods(json.properties.periods); // save this as a state variable.
                            setLat(latitude);
                            setLon(longitude);
                        })
                });
            console.log("Captured location: ", position.coords);
        }
        // On Geolocation error: Set lat & lon to null;
        const locationError = () => {
            setLat(null);
            setLon(null);
            console.error("Unable to get location");
        }
        
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError);

        // Clean up function
        return () => {
            // TODO: any cleanup here.
        };
    }, []);

    // Construct a string including (latitude, longitude)
    let location = ""
    if(lat && lon) {
        location = ` for (${lat}, ${lon})`
    }
    console.log("Weather for location: ", location);

    // Render our array of periods.
    const forecast = periods.map((period, index) => {
        return <div key={"period-" + index} className="forecast-child">
            <img src={period.icon} />
            <br/>
            <strong>{period.name}</strong> 
            <hr />
            {period.detailedForecast} <br/>
            <strong className="temp">{period.temperature} {period.temperatureUnit}</strong>
        </div>
    })


    return (
        <div>
            <h1>Weather {location}</h1>
            <div className="forecast-container">{forecast}</div>
        </div>
    )
}

export default Weather;