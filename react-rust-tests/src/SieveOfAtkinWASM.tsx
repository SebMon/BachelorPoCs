import { useState } from "react";
import init, { calculate_primes } from "src-wasm";

export default function SieveOfAtkinWASM() {
  const [b, setB] = useState(0);
  const [primeText, setPrimeText] = useState("");

  return (
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
  );
}
