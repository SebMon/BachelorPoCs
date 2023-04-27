import { useState } from "react";
import { AESEncrypt } from "./encryption/aes/encrypt";
import { AESDecrypt } from "./encryption/aes/decrypt";

const aesKey: Uint8Array = new Uint8Array([
  53, 51, 54, 56, 53, 54, 54, 68, 53, 57, 55, 49, 51, 51, 55, 51, 51, 54, 55,
  54, 51, 57, 55, 57, 50, 52, 52, 50, 50, 54, 52, 53,
]);

export default function AesJS() {
  const [inputSize, setInputSize] = useState(0);
  const [encryptTiming, setEncryptTiming] = useState("");
  const [decryptTiming, setDecryptTiming] = useState("");

  return (
    <div className="card">
      <h2>JS AES</h2>
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
          let startTime = performance.now();
          const encrypted = AESEncrypt(randomByteArray(inputSize), aesKey);
          let endTime = performance.now();
          setEncryptTiming(
            `Encrypted into ${encrypted.length} bytes in: ${Math.round(
              endTime - startTime
            )} miliseconds.`
          );
          startTime = performance.now();
          const decrypted = AESDecrypt(encrypted, aesKey);
          endTime = performance.now();
          setDecryptTiming(
            `Decrypted into ${decrypted.length} bytes in: ${Math.round(
              endTime - startTime
            )} miliseconds.`
          );
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
