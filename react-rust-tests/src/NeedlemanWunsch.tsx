import { useState } from "react";

function NeedlemanWunsch() {
    const [limit, setLength] = useState(0);
    const [text, setText] = useState("");

    return (
        <div className="card">
            <h2>JS Proteins</h2>
            <input type="number" value={limit} onChange={(event) => {
                setLength(parseInt(event.target.value))
            }} />
            <button onClick={() => {
                let startTime = performance.now();
                let proteins = getProteins(randomProtein(limit), randomProtein(limit));
                //let proteins = getProteins("GATTACA", "GCATGCU")
                let endTime = performance.now();
                let duration = Math.round(endTime - startTime)
                setText(`S1 length: ${proteins[0].length}. S2 length: ${proteins[1].length}. Millis: ${duration}`)

            }}> Align Proteins! </button>
            <p>{text}</p>
        </div>
    )
}

export default NeedlemanWunsch;

function randomProtein(length: number): String {
    let result = '';
    const proteinChars = 'ACGT';
    const charLength = proteinChars.length;

    let counter = 0;
    while (counter < length) {
        result += proteinChars.charAt(Math.floor(Math.random() * charLength));
        counter += 1;
    }
    return result;
}

function getProteins(x: String, y: String): String[] {
    const GAP_PENALTY = 1;
    const MATCH_AWARD = 1;
    const MISMATCH_PENALTY = 1;

    let nx = x.length;
    let ny = y.length;

    let n = nx + 1;
    let m = ny + 1;

    //let f = [...Array(nx + 1)].map(e => Array(ny + 1).fill(0));
    let f = Array(n * m).fill(0);

    for (let i = 0; i < n; i++) {
        f[i * m + 0] = GAP_PENALTY * -i;
    }
    for (let i = 0; i < m; i++) {
        f[0 * m + i] = GAP_PENALTY * -i;
    }

    //let p = [...Array(nx + 1)].map(e => Array(ny + 1).fill(0));
    let p = Array(n * m).fill(0);
    for (let i = 0; i < n; i++) {
        p[i * m + 0] = 3;
    }
    for (let i = 0; i < m; i++) {
        p[0 * m + i] = 4;
    }

    let t = [0, 0, 0];
    for (let i = 0; i < nx; i++) {
        for (let j = 0; j < ny; j++) {
            if (x[i] == y[j]) {
                t[0] = f[i * m + j] + MATCH_AWARD;
            } else {
                t[0] = f[i * m + j] - MISMATCH_PENALTY;
            }
            t[1] = f[i * m + (j + 1)] - GAP_PENALTY;
            t[2] = f[(i + 1) * m + j] - GAP_PENALTY;

            let max_value = Math.max(...t);
            f[(i + 1) * m + (j + 1)] = max_value;

            if (t[0] == max_value) {
                p[(i + 1) * m + (j + 1)] += 2;
            }
            if (t[1] == max_value) {
                p[(i + 1) * m + (j + 1)] += 3;
            }
            if (t[2] == max_value) {
                p[(i + 1) * m + (j + 1)] += 4;
            }
        }
    }

    let i = nx;
    let j = ny;

    let rx = "";
    let ry = "";

    while (i > 0 || j > 0) {
        if ([2, 5, 6, 9].includes(p[i * m + j])) {
            rx += x[i - 1];
            ry += y[j - 1];
            i -= 1;
            j -= 1;
        } else if ([3, 5, 7, 9].includes(p[i * m + j])) {
            rx += x[i - 1];
            ry += "-";
            i -= 1;
        } else if ([4, 6, 7, 9].includes(p[i * m + j])) {
            rx += "-";
            ry += y[j - 1];
            j -= 1;
        }
    }

    rx = rx.split("").reverse().join("");
    ry = ry.split("").reverse().join("");

    return [rx, ry];
}