import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import init, { wasmModule } from './wasm';

function App() {

  const [wasm, setWasm] = useState<wasmModule | undefined>(undefined)

  useEffect(() => {
    init().then((wm) => {
      setWasm(wm)
    })
  }, [])

  useEffect(() => {
    if (wasm) {
      console.log(wasm?.add(1,2))
    }
  }, [wasm])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
