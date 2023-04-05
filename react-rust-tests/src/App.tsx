import { useState } from "react";
import "./App.css";
import init, { calculate_primes, proteins } from "src-wasm";
import SieveOfAtkin from "./SieveOfAtkin";
import NeedlemanWunsch from "./NeedlemanWunsch";

function randomProtein(length: number) {
  let result = "";
  const proteinChars = "ACGT";
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
  const [b, setB] = useState(0);
  const [primeText, setPrimeText] = useState("");
  const [proteinText, setProteinText] = useState("");

  return (
    <div className="App">
      <h2>Benchmarking Rust WASM</h2>
      <div className="flex-container">
        <div className="card">
          <h3>WASM Proteins</h3>
          <input
            type="number"
            value={a}
            onChange={(event) => {
              setA(parseInt(event.target.value));
            }}
          />
          <button
            onClick={() => {
              init().then(() => {
                let startTime = performance.now();
                const result = proteins(randomProtein(a), randomProtein(a));
                let endTime = performance.now();
                setProteinText(
                  result + ` Millis: ${Math.round(endTime - startTime)}`
                );
              });
            }}
          >
            Align Proteins!
          </button>
          <p>{proteinText}</p>
        </div>
        <div className="card">
          <h2>WASM Primes</h2>
          <input
            type="number"
            value={b}
            onChange={(event) => {
              setB(parseInt(event.target.value));
            }}
          />
          <button
            onClick={() => {
              init().then(() => {
                let startTime = performance.now();
                const result = calculate_primes(b);
                let endTime = performance.now();
                setPrimeText(
                  result + ` Millis: ${Math.round(endTime - startTime)}`
                );
              });
            }}
          >
            Calculate Primes!
          </button>
          <p>{primeText}</p>
        </div>
        <NeedlemanWunsch></NeedlemanWunsch>
        <SieveOfAtkin></SieveOfAtkin>
      </div>
    </div>
  );
}

export default App;
