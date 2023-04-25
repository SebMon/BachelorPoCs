import { useState } from "react";
import "./App.css";
import init, {
  calculate_primes,
  proteins,
  aes_decrypt,
  aes_encrypt,
} from "src-wasm";
import SieveOfAtkinJS from "./SieveOfAtkinJS";
import NeedlemanWunschJS from "./NeedlemanWunschJS";
import NeedlemanWunschWASM from "./NeedlemanWunchWASM";
import SieveOfAtkinWASM from "./SieveOfAtkinWASM";
import AesWASM from "./AesWASM";
import RsaWASM from "./RsaWASM";

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
  return (
    <div className="App">
      <h2>Benchmarking Rust WASM</h2>
      <div className="flex-container">
        <NeedlemanWunschWASM></NeedlemanWunschWASM>
        <SieveOfAtkinWASM></SieveOfAtkinWASM>
        <AesWASM></AesWASM>
        <RsaWASM></RsaWASM>
        <NeedlemanWunschJS></NeedlemanWunschJS>
        <SieveOfAtkinJS></SieveOfAtkinJS>
      </div>
    </div>
  );
}

export default App;
