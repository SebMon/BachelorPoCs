import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import init, { fib, proteins } from 'src-wasm';

function randomProtein(length: number) {
  let result = '';
  const proteinChars = 'ACGT';
  const charLength = proteinChars.length;

  let counter = 0;
  while (counter < length) {
    result += proteinChars.charAt(Math.floor(Math.random() * charLength));
    counter += 1;
  }
  return result;
}

function App() {
  const [a, setA] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
      <input type="number" value={a} onChange={(event) => {
          setA(parseInt(event.target.value))
        }}/>
        <button onClick={() => {
          init().then(() => {
            var startTime = performance.now();
            var result = proteins(randomProtein(a), randomProtein(a));
            var endTime = performance.now();
            console.log(result);
            console.log(`Time taken in total: ${endTime - startTime}`);
          })
        }}>
          Calculate!
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
