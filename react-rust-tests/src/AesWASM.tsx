import { useState } from "react";
import init, { aes_decrypt, aes_encrypt } from "src-wasm";

const aesKey: Uint8Array = new Uint8Array([
  53, 51, 54, 56, 53, 54, 54, 68, 53, 57, 55, 49, 51, 51, 55, 51, 51, 54, 55,
  54, 51, 57, 55, 57, 50, 52, 52, 50, 50, 54, 52, 53,
]);

export default function AesWASM() {
  const [inputSize, setInputSize] = useState(0);
  const [encryptTiming, setEncryptTiming] = useState("");
  const [decryptTiming, setDecryptTiming] = useState("");

  return (
    <div className="card">
      <h2>WASM AES</h2>
      <label>Length of encryption input</label>
      <input
        type="number"
        value={inputSize}
        onChange={(event) => {
          setInputSize(parseInt(event.target.value));
        }}
      />

      <button
        onClick={() => {
          init().then(() => {
            let startTime = performance.now();
            const encrypted = aes_encrypt(randomByteArray(inputSize), aesKey);
            let endTime = performance.now();
            setEncryptTiming(
              `Encrypted into ${encrypted.length} bytes in: ${Math.round(
                endTime - startTime
              )} miliseconds.`
            );
            startTime = performance.now();
            const decrypted = aes_decrypt(encrypted, aesKey);
            endTime = performance.now();
            setDecryptTiming(
              `Decrypted into ${decrypted.length} bytes in: ${Math.round(
                endTime - startTime
              )} miliseconds.`
            );
          });
        }}
      >
        Test!
      </button>
      <p>{encryptTiming}</p>
      <p>{decryptTiming}</p>
    </div>
  );
}

function randomByteArray(length: number): Uint8Array {
  return Uint8Array.from({ length: length }, () =>
    Math.floor(Math.random() * 255)
  );
}
