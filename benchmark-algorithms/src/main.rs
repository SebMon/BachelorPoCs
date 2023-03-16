use std::time::Instant;
use thousands::Separable;
use rand::seq::SliceRandom;

use crate::needleman_wunsch::calculate_score;

mod sieve_of_atkin;
mod needleman_wunsch;

const PRIME_LIMIT: usize= 20_000_000;
const PROTEIN_SIZE: u32 = 2_000;

fn main() {
    let start = Instant::now();
    let _primes = sieve_of_atkin::get_primes(&PRIME_LIMIT);
    let duration = start.elapsed();
    // Uncomment below loop to print 
    // Printing does not affect the timer, but will have an effect on 
    // profiling/measuring from the outside.
    
    /*
    for prime in _primes {
        print!("{} ", prime.separate_with_commas());
    }
    println!("");
    */
    println!("It took {} milliseconds to calculate primes under {}", duration.as_millis().separate_with_commas(), PRIME_LIMIT.separate_with_commas());


    // Generate random protein strings
    let mut protein_x: Vec<char> = Vec::new();
    let mut protein_y: Vec<char> = Vec::new();
    let possible_values = vec!['A','T','G','C'];
    for _ in 0..PROTEIN_SIZE {
        protein_x.push(possible_values.choose(&mut rand::thread_rng()).unwrap().clone());
        protein_y.push(possible_values.choose(&mut rand::thread_rng()).unwrap().clone());
    }

    let start = Instant::now();
    let (protein_x, protein_y) = calculate_score(&protein_x, &protein_y);
    let duration = start.elapsed();
    println!("It took {} milliseconds to calculate protein alignments with proteins of length {}", duration.as_millis().separate_with_commas(), PROTEIN_SIZE.separate_with_commas());

    /*
    for c in protein_x {
        print!("{}", c);
    }
    println!("");
    for c in protein_y {
        print!("{}", c);
    }
    println!("");
    */
    
}