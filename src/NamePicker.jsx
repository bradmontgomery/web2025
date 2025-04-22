import { useState } from 'react';


function NamePicker() {
    const adjectives = ["Strong", "Tired", "Stinky", "Sleepy", "Odd", "Annoyed"];
    const colors = ["Goldenrod", "Mauve", "Turquiose", "Maroon", "Puke Green", "Fuschia"];
    const nouns = ["Cat", "Flower", "Tiger", "Garbage", "Barn Door", "Dragon", "Dog"];

    const generateName = () => {
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];

        return `${adj} ${color} ${noun}`;
    }
    const [ currentName, setCurrentName ] = useState(generateName());

    return (
        <div>
            <h1>{currentName}</h1>
            <button onClick={() => setCurrentName(generateName())}>Generate a Name</button>
        </div>
    )
}

export default NamePicker;