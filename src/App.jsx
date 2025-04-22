import { useState } from 'react';

import './App.css';
import Clock from './Clock';
import ColorPicker from './ColorPicker';

function App() {
  const [count, setCount] = useState(0)
  const [clockColor, setClockColor] = useState("#ff0000");

  function handleColorChange(color) {
    setClockColor(color);
    console.log("Color Change: ", color);
  }

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ColorPicker onChange={handleColorChange} />
      <Clock color={clockColor} locale='en-US' />
    </>
  )
}

export default App
