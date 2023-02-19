import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import init, { fib } from 'src-wasm';

function App() {

  const [a, setA] = useState(0);

  const fibJS = (a: number): number => {
    if (a<=1) {
      return a
    }
    return fibJS(a-1)+fibJS(a-2)
  }

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
        <input type="number" value={a} onChange={(event) => {
          setA(parseInt(event.target.value))
        }}/>
        <button onClick={() => {
          init().then(() => {
            console.log(fib(a))
            console.log(fibJS(a))
          })
        }}>
          Calculate!
        </button>
      </header>
    </div>
  );
}

export default App;
