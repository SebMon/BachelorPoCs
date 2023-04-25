import { useState } from "react";
import init, { rsa_encrypt, rsa_decrypt } from "src-wasm";

const PublicModulo = new Uint8Array([
  175, 68, 187, 247, 176, 243, 132, 110, 90, 46, 72, 231, 114, 156, 52, 43, 25,
  88, 23, 31, 158, 179, 32, 83, 18, 227, 175, 123, 107, 47, 118, 231, 57, 48,
  92, 116, 89, 55, 172, 201, 181, 194, 76, 19, 161, 89, 162, 119, 49, 79, 160,
  237, 182, 64, 169, 212, 190, 196, 186, 251, 85, 239, 20, 216, 102, 194, 226,
  177, 65, 89, 30, 167, 38, 92, 88, 218, 28, 32, 32, 66, 91, 115, 133, 57, 160,
  61, 147, 55, 40, 99, 113, 116, 62, 104, 162, 68, 223, 208, 244, 162, 20, 166,
  58, 126, 217, 61, 177, 126, 75, 39, 93, 121, 11, 132, 51, 91, 87, 242, 2, 232,
  208, 86, 150, 2, 29, 20, 16, 104, 88, 220, 111, 109, 209, 187, 223, 37, 170,
  168, 51, 154, 229, 94, 236, 188, 213, 128, 128, 62, 95, 158, 135, 131, 207,
  206, 183, 131, 221, 249, 8, 203, 111, 33, 204, 148, 156, 26, 17, 48, 126, 151,
  222, 32, 60, 219, 164, 165, 43, 102, 163, 9, 60, 59, 240, 57, 249, 201, 131,
  89, 186, 89, 36, 187, 75, 255, 221, 9, 166, 89, 250, 70, 201, 134, 238, 180,
  172, 2, 165, 229, 192, 138, 69, 223, 41, 108, 244, 239, 147, 116, 193, 33,
  180, 194, 195, 101, 179, 226, 4, 121, 205, 133, 98, 25, 60, 82, 208, 226, 152,
  110, 48, 68, 133, 84, 142, 213, 106, 118, 130, 32, 116, 139, 179, 46, 202,
  177, 31, 207,
]);

const PublicExponent = new Uint8Array([0x01, 0x00, 0x01]);

const PrivateModulo = new Uint8Array([
  175, 68, 187, 247, 176, 243, 132, 110, 90, 46, 72, 231, 114, 156, 52, 43, 25,
  88, 23, 31, 158, 179, 32, 83, 18, 227, 175, 123, 107, 47, 118, 231, 57, 48,
  92, 116, 89, 55, 172, 201, 181, 194, 76, 19, 161, 89, 162, 119, 49, 79, 160,
  237, 182, 64, 169, 212, 190, 196, 186, 251, 85, 239, 20, 216, 102, 194, 226,
  177, 65, 89, 30, 167, 38, 92, 88, 218, 28, 32, 32, 66, 91, 115, 133, 57, 160,
  61, 147, 55, 40, 99, 113, 116, 62, 104, 162, 68, 223, 208, 244, 162, 20, 166,
  58, 126, 217, 61, 177, 126, 75, 39, 93, 121, 11, 132, 51, 91, 87, 242, 2, 232,
  208, 86, 150, 2, 29, 20, 16, 104, 88, 220, 111, 109, 209, 187, 223, 37, 170,
  168, 51, 154, 229, 94, 236, 188, 213, 128, 128, 62, 95, 158, 135, 131, 207,
  206, 183, 131, 221, 249, 8, 203, 111, 33, 204, 148, 156, 26, 17, 48, 126, 151,
  222, 32, 60, 219, 164, 165, 43, 102, 163, 9, 60, 59, 240, 57, 249, 201, 131,
  89, 186, 89, 36, 187, 75, 255, 221, 9, 166, 89, 250, 70, 201, 134, 238, 180,
  172, 2, 165, 229, 192, 138, 69, 223, 41, 108, 244, 239, 147, 116, 193, 33,
  180, 194, 195, 101, 179, 226, 4, 121, 205, 133, 98, 25, 60, 82, 208, 226, 152,
  110, 48, 68, 133, 84, 142, 213, 106, 118, 130, 32, 116, 139, 179, 46, 202,
  177, 31, 207,
]);

const PrivateExponent = new Uint8Array([
  115, 238, 88, 102, 211, 79, 149, 158, 190, 7, 223, 134, 141, 158, 26, 57, 18,
  138, 135, 107, 184, 56, 25, 41, 132, 170, 107, 104, 140, 210, 216, 126, 25,
  85, 227, 209, 188, 135, 23, 24, 255, 203, 133, 49, 118, 221, 211, 67, 174,
  175, 167, 194, 234, 31, 219, 139, 135, 249, 67, 180, 251, 205, 40, 167, 80,
  166, 237, 75, 167, 67, 75, 173, 239, 7, 38, 105, 30, 220, 33, 37, 24, 173,
  251, 113, 119, 225, 237, 126, 142, 141, 227, 40, 86, 31, 138, 139, 89, 128,
  50, 251, 2, 173, 156, 3, 161, 3, 216, 99, 177, 82, 88, 129, 184, 113, 185,
  134, 177, 250, 183, 241, 241, 220, 169, 92, 188, 137, 222, 79, 100, 54, 173,
  223, 90, 138, 36, 141, 38, 230, 73, 113, 134, 93, 133, 105, 165, 254, 159, 19,
  188, 240, 208, 18, 59, 128, 174, 249, 230, 93, 189, 29, 138, 102, 107, 49,
  185, 30, 24, 25, 155, 2, 175, 31, 80, 53, 2, 105, 87, 247, 228, 99, 222, 101,
  77, 113, 173, 174, 39, 147, 133, 196, 186, 12, 242, 145, 218, 253, 40, 155,
  238, 155, 210, 132, 146, 199, 63, 36, 103, 20, 99, 6, 185, 99, 30, 214, 15,
  222, 60, 249, 3, 83, 85, 251, 35, 240, 83, 124, 246, 6, 13, 192, 162, 51, 167,
  239, 167, 103, 150, 157, 28, 215, 152, 172, 72, 132, 167, 29, 90, 76, 232, 14,
  117, 43, 230, 1, 225,
]);

export default function RsaWASM() {
  const [rsaEncryptIn, setRsaEncryptIn] = useState("");
  const [rsaDecryptIn, setRsaDecryptIn] = useState("");
  const [rsaEncryptOut, setRsaEncryptOut] = useState("");
  const [rsaDecryptOut, setRsaDecryptOut] = useState("");

  return (
    <div className="card">
      <h2>WASM RSA</h2>
      <div className="row">
        <label>To Encrypt </label>
        <input
          type="text"
          value={rsaEncryptIn}
          onChange={(event) => {
            setRsaEncryptIn(event.target.value);
          }}
        />
      </div>
      <div className="row">
        <label>To decrypt </label>
        <input
          type="text"
          value={rsaDecryptIn}
          onChange={(event) => {
            setRsaDecryptIn(event.target.value);
          }}
        />
      </div>

      <button
        onClick={() => {
          init().then(() => {
            let startTime = performance.now();
            const result = rsa_encrypt(
              textToBytes(rsaEncryptIn),
              PublicModulo,
              PublicExponent
            );
            let endTime = performance.now();
            setRsaEncryptOut(
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
            const result = rsa_decrypt(
              hexToBytes(rsaDecryptIn),
              PrivateModulo,
              PrivateExponent
            );
            let endTime = performance.now();
            setRsaDecryptOut(
              `"${bytesToText(result)}" Millis: ${Math.round(
                endTime - startTime
              )}`
            );
          });
        }}
      >
        Decrypt!
      </button>

      <p>Encrypted:</p>
      <textarea readOnly value={rsaEncryptOut}></textarea>

      <p>Decrypted: {rsaDecryptOut}</p>
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
