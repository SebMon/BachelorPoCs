import { useState } from "react";
import "./App.css";
import SieveOfAtkinJS from "./SieveOfAtkinJS";
import NeedlemanWunschJS from "./NeedlemanWunschJS";
import NeedlemanWunschWASM from "./NeedlemanWunchWASM";
import SieveOfAtkinWASM from "./SieveOfAtkinWASM";
import AesWASM from "./AesWASM";
import RsaWASM from "./RsaWASM";
import AesJS from "./AesJS";
import RsaJS from "./RsaJS";
import "bootstrap/dist/css/bootstrap.min.css";

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
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <NeedlemanWunschWASM></NeedlemanWunschWASM>
          </div>
          <div className="col-sm">
            <NeedlemanWunschJS></NeedlemanWunschJS>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <SieveOfAtkinWASM></SieveOfAtkinWASM>
          </div>
          <div className="col-sm">
            <SieveOfAtkinJS></SieveOfAtkinJS>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <AesWASM></AesWASM>
          </div>
          <div className="col-sm">
            <AesJS></AesJS>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <RsaWASM></RsaWASM>
          </div>
          <div className="col-sm">
            <RsaJS></RsaJS>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
