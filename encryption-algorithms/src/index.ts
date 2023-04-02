import { encrypt, decrypt } from "./algorithms/AES";
import {
  textToBytes,
  bytesToText,
  bytesToHex,
  hexToBytes,
} from "./encodeDecode";

const plain = "Hello world, I'm testing my algorithm";
console.log(plain.length);

const key = "3533363835363644353937313333373333363736333937393234343232363435";

const cipher = encrypt(textToBytes(plain), hexToBytes(key));

console.log(bytesToHex(cipher));

const newPlain = decrypt(cipher, hexToBytes(key));

console.log(bytesToText(newPlain));
console.log(newPlain.length);
