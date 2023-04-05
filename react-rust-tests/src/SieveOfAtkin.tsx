import { useState } from "react";

function SieveOfAtkin() {
  const [limit, setLimit] = useState(0);
  const [text, setText] = useState("");

  return (
    <div className="card">
      <h2>JS Primes</h2>
      <input
        type="number"
        value={limit}
        onChange={(event) => {
          setLimit(parseInt(event.target.value));
        }}
      />
      <button
        onClick={() => {
          let startTime = performance.now();
          let primes = getPrimes(limit);
          let endTime = performance.now();
          let duration = Math.round(endTime - startTime);
          setText(`Primes: ${primes.length}. Millis: ${duration}`);
        }}
      >
        {" "}
        Calculate Primes!{" "}
      </button>
      <p>{text}</p>
    </div>
  );
}

export default SieveOfAtkin;

function getPrimes(limit: number): number[] {
  let primes = [];
  if (limit > 2) {
    primes.push(2);
  }
  if (limit > 3) {
    primes.push(3);
  }

  let sieve = Array(limit + 1).fill(false);
  let x = 1;
  while (x * x <= limit) {
    let y = 1;
    while (y * y <= limit) {
      let n = 4 * x * x + y * y;
      if (n <= limit && (n % 12 == 1 || n % 12 == 5)) {
        sieve[n] = !sieve[n];
      }

      n = 3 * x * x + y * y;
      if (n <= limit && n % 12 == 7) {
        sieve[n] = !sieve[n];
      }

      n = 3 * x * x - y * y;
      if (n <= limit && x > y && n % 12 == 11) {
        sieve[n] = !sieve[n];
      }

      y += 1;
    }

    x += 1;
  }

  let r = 5;
  while (r * r <= limit) {
    if (sieve[r]) {
      let i = r * r;
      while (i <= limit) {
        sieve[i] = false;
        i += r * r;
      }
    }
    r += 1;
  }

  for (let i = 5; i < limit; i++) {
    if (sieve[i]) {
      primes.push(i);
    }
  }

  return primes;
}
