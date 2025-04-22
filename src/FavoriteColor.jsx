import { useState } from 'react';

import './FavoriteColor.css';

// Save a color hex value in local storage.
function saveFavoriteColor(color) {
    window.localStorage.setItem('favorite-color', color);
}

function getFavoriteColor() {
    return window.localStorage.getItem('favorite-color');
}


function FavoriteColor() {

    const [ favoriteColor, setFavoriteColor ] = useState(getFavoriteColor());

    function handleChange(event) {
        const color = event.target.value;
        console.log("Color selected: ", color);
        setFavoriteColor(color); // change the state for the React Component. (rerender)
        saveFavoriteColor(color); // saves the color to localstorage.
    }

    const style = favoriteColor ? {backgroundColor: favoriteColor} : {}

    return (
        <div className="favorite-color" style={style}>
            { favoriteColor && <h2>Favorite color is: {favoriteColor}</h2>}
            <p>
                <input type="color" onChange={handleChange} />
                &nbsp; Choose your favorite color.
            </p>
        </div>
    )
}

export default FavoriteColor;