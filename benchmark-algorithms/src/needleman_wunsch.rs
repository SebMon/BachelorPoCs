use std::vec;

const GAP_PENALTY: isize = 1;
const MATCH_AWARD: isize = 1;
const MISMATCH_PENALTY: isize = 1;

pub fn calculate_score(x: &Vec<char>, y: &Vec<char>) -> (Vec<char>, Vec<char>,) {
    let nx = x.len();
    let ny = y.len();

    let n = nx + 1;
    let m = ny + 1;

    //let mut f: Vec<Vec<isize>> = vec![vec![0; ny + 1]; nx + 1];
    let mut f: Vec<isize> = vec![0; n * m];

    // Fill top row and left most column
    for i in 0..n {
        //f[i][0] = GAP_PENALTY * -(i as isize);
        f[i * m + 0] = GAP_PENALTY * -(i as isize);
    }
    for i in 0..m {
        //f[0][i] = GAP_PENALTY * -(i as isize);
        f[0 * m + i] = GAP_PENALTY * -(i as isize);
    }

    //let mut p = vec![vec![0; ny + 1]; nx + 1];
    let mut p = vec![0; n * m];
    for i in 0..n {
        //p[i][0] = 3;
        p[i * m + 0] = 3;
    }
    for i in 0..m {
        //p[0][i] = 4;
        p[0 * m + i] = 4;
    }

    let mut t = vec![0; 3];
    for i in 0..nx {
        for j in 0..ny {
            if x[i] == y[j] {
                //t[0] = f[i][j] + MATCH_AWARD;
                t[0] = f[i * m + j] + MATCH_AWARD;
            } else {
                //t[0] = f[i][j] -  MISMATCH_PENALTY;
                t[0] = f[i * m + j] -  MISMATCH_PENALTY;
            }
            //t[1] = f[i][j + 1] - GAP_PENALTY;
            t[1] = f[i * m + (j + 1)] - GAP_PENALTY;
            //t[2] = f[i + 1][j] - GAP_PENALTY;
            t[2] = f[(i + 1) * m + j] - GAP_PENALTY;

            let max_value = *t.iter().max().unwrap();
            //f[i + 1][j + 1] = max_value;
            f[(i + 1) * m + (j + 1)] = max_value;

            if t[0] == max_value {
                //p[i + 1][j + 1] += 2;
                p[(i + 1) * m + (j + 1)] += 2;
            }
            if t[1] == max_value {
                //p[i + 1][j + 1] += 3;
                p[(i + 1) * m + (j + 1)] += 3;
            }
            if t[2] == max_value {
                //p[i + 1][j + 1] += 4;
                p[(i + 1) * m + (j + 1)] += 4;
            }
        }
    }


    let mut i = nx;
    let mut j = ny;

    let mut rx = Vec::new();
    let mut ry = Vec::new();

    while i > 0 || j > 0 {
        if [2, 5, 6, 9].contains(&p[i * m + j]) {
            rx.push(x[i - 1]);
            ry.push(y[j - 1]);
            i -= 1;
            j -= 1;
        } else if [3, 5, 7, 9].contains(&p[i * m + j]) {
            rx.push(x[i - 1]);
            ry.push('-');
            i -= 1;
        } else if [4, 6, 7, 9].contains(&p[i * m + j]) {
            rx.push('-');
            ry.push(y[j - 1]);
            j -= 1;
        }
    }

    

    rx.reverse();
    ry.reverse();
    
    (rx, ry)
}