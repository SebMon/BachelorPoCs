import { useState } from "react";
import init, { aes_decrypt, aes_encrypt } from "src-wasm";

export default function AesWASM() {
  const [aesEncryptIn, setAesEncryptIn] = useState("");
  const [aesDecryptIn, setAesDecryptIn] = useState("");
  const [aesEncryptOut, setAesEncryptOut] = useState("");
  const [aesDecryptOut, setAesDecryptOut] = useState("");
  const [aesKey, setAesKey] = useState(
    "3533363835363644353937313333373333363736333937393234343232363435"
  );

  return (
    <div className="card">
      <h2>WASM AES</h2>
      <div className="row">
        <label>To Encrypt </label>
        <input
          type="text"
          value={aesEncryptIn}
          onChange={(event) => {
            setAesEncryptIn(event.target.value);
          }}
        />
      </div>
      <div className="row">
        <label>To decrypt </label>
        <input
          type="text"
          value={aesDecryptIn}
          onChange={(event) => {
            setAesDecryptIn(event.target.value);
          }}
        />
      </div>
      <div className="row">
        <label>Key </label>
        <input
          type="text"
          value={aesKey}
          onChange={(event) => {
            setAesKey(event.target.value);
          }}
        />
      </div>

      <button
        onClick={() => {
          init().then(() => {
            let startTime = performance.now();
            const result = aes_encrypt(
              textToBytes(aesEncryptIn),
              hexToBytes(aesKey)
            );
            let endTime = performance.now();
            setAesEncryptOut(
              `"${bytesToHex(result)}" Millis: ${Math.round(
                endTime - startTime
              )}`
            );
          });
        }}
      >
        Encrypt!
      </button>

      <button
        onClick={() => {
          init().then(() => {
            let startTime = performance.now();
            const result = aes_decrypt(
              hexToBytes(aesDecryptIn),
              hexToBytes(aesKey)
            );
            let endTime = performance.now();
            setAesDecryptOut(
              `"${bytesToText(result)}" Millis: ${Math.round(
                endTime - startTime
              )}`
            );
          });
        }}
      >
        Decrypt!
      </button>

      <p>Encrypted: {aesEncryptOut}</p>

      <p>Decrypted: {aesDecryptOut}</p>
    </div>
  );
}

function textToBytes(text: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(text);
}

function bytesToText(bytes: Uint8Array): string {
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length / 2; i++) {
    bytes.set([parseInt(hex.substring(2 * i, 2 * i + 2), 16)], i);
  }
  return bytes;
}

function bytesToHex(bytes: Uint8Array): string {
  const hexStrings: string[] = [];
  bytes.forEach((byte) => {
    hexStrings.push(byte.toString(16).padStart(2, "0"));
  });
  return hexStrings.join("");
}
