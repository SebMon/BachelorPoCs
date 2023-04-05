pub fn get_primes(limit: &usize) -> Vec<usize>{
    let mut primes = Vec::new();
    if *limit > 2 {
        primes.push(2);
    };
    if *limit > 3 {
        primes.push(3);
    };

    let mut sieve = vec![false; limit + 1];

    let mut x: usize = 1;

    while x * x <= *limit {

        let mut y: usize = 1;
        while y * y <= *limit {

            let n = (4 * x * x) + (y * y); //125
            if n<= *limit && (n % 12 == 1 || n % 12 == 5) {
                // If sieve[n] is false, set to true. If true, set to false
                sieve[n] ^= true;
            }

            let n = (3 * x * x) + (y * y);
            if n <= *limit && n % 12 == 7 {
                // If sieve[n] is false, set to true. If true, set to false
                sieve[n] ^= true;
            }

            let n: usize = (((3 * x * x) as isize) - ((y * y) as isize)) as usize;
            if n <= *limit && x > y && n % 12 == 11 {
                // If sieve[n] is false, set to true. If true, set to false
                sieve[n] ^= true;
            }

            y += 1;
        }

        x += 1;
    }

    let mut r = 5;
    while r * r <= *limit {
        if sieve[r] {
            let mut i = r * r;
            while i <= *limit {
                sieve[i] = false;
                i += r * r;
            }
        }
        r += 1;
    }

    for a in 5..=*limit {
        if sieve[a] {
            primes.push(a);
        }
    }

    primes
}