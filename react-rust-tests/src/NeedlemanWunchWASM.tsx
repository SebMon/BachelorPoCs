import { useState } from "react";
import init, { proteins } from "src-wasm";

export default function NeedlemanWunschWASM() {
  const [a, setA] = useState(0);
  const [proteinText, setProteinText] = useState("");

  return (
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
  );
}

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
