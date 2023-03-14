use std::time::Instant;
use thousands::Separable;

mod sieve_of_atkin;

const PRIME_LIMIT: usize= 100_000_000;

fn main() {
    let start = Instant::now();
    let _primes = sieve_of_atkin::get_primes(&PRIME_LIMIT);
    let duration = start.elapsed();
    // Uncomment below loop to print 
    // Printing does not affect the timer, but will have an effect on 
    // profiling/measuring from the outside.
    //for prime in _primes {
    //    print!("{} ", prime.separate_with_commas());
    //}
    //println!("");
    println!("It took {} milliseconds to calculate primes under {}", duration.as_millis().separate_with_commas(), PRIME_LIMIT.separate_with_commas());
}
