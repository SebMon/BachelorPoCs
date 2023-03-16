use std::time::Instant;
use thousands::Separable;

use crate::needleman_wunsch::calculate_score;

mod sieve_of_atkin;
mod needleman_wunsch;

const PRIME_LIMIT: usize= 100_000;

fn main() {
    let start = Instant::now();
    let _primes = sieve_of_atkin::get_primes(&PRIME_LIMIT);
    let duration = start.elapsed();
    // Uncomment below loop to print 
    // Printing does not affect the timer, but will have an effect on 
    // profiling/measuring from the outside.
    
    for prime in _primes {
        print!("{} ", prime.separate_with_commas());
    }
    println!("");
    println!("It took {} milliseconds to calculate primes under {}", duration.as_millis().separate_with_commas(), PRIME_LIMIT.separate_with_commas());
    
    let protein_x = vec!['G', 'C', 'A', 'A', 'T',
        'G', 'T', 'G', 'T', 'C', 
        'A', 'C', 'G', 'G', 'T', 
        'T', 'G', 'G', 'A', 'A', 
        'A', 'A', 'G', 'C', 'C', 
        'A', 'A', 'C', 'G', 'A', 
        'T', 'G', 'G', 'C', 'T', 
        'G', 'T', 'A', 'C', 'C', 
        'G', 'C', 'A', 'C', 'A', 
        'A', 'T', 'G', 'T', 'T'];
    let protein_y = vec!['C', 'G', 'A', 'G', 'A', 
        'G', 'C', 'T', 'A', 'G', 
        'G', 'C', 'A', 'T', 'T', 
        'A', 'G', 'A', 'C', 'A', 
        'T', 'A', 'A', 'G', 'T', 
        'C', 'T', 'A', 'A', 'C', 
        'A', 'G', 'A', 'G', 'G', 
        'T', 'G', 'C', 'T', 'C', 
        'T', 'T', 'C', 'T', 'C', 
        'A', 'C', 'C', 'T', 'C'];

    let start = Instant::now();
    let (protein_x, protein_y) = calculate_score(&protein_x, &protein_y);
    let duration = start.elapsed();
    println!("It took {} milliseconds to the protein stuff", duration.as_millis().separate_with_commas());

    for c in protein_x {
        print!("{}", c);
    }
    println!("");
    for c in protein_y {
        print!("{}", c);
    }
    println!("");
    
}
