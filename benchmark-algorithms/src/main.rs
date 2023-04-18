use std::time::Instant;
use aes::aes_encrypt;
use thousands::Separable;
use rand::seq::SliceRandom;
use hex;

use crate::{needleman_wunsch::calculate_score, aes::aes_decrypt};

mod sieve_of_atkin;
mod needleman_wunsch;
mod aes;

const PRIME_LIMIT: usize= 50_000_000;
const PROTEIN_SIZE: u32 = 20_000;

fn main() {
    loop {
        let mut line = String::new();
        println!("Input protein, prime, aes");
        std::io::stdin().read_line(&mut line).expect("Failed to read line");
        let line_to_compare = line.trim().to_lowercase();

        match line_to_compare.as_str() {
            "protein" => run_protein(),
            "prime" => run_prime(),
            "aes" => run_aes(),
            "q" | "exit" | "quit" => break,
            _ => println!("Error, unknown input.\n"),
        }
    }
}

fn run_protein() {
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
    println!("Protein millis: {}. Length {}. S1 length: {}. S2 length: {}", duration.as_millis().separate_with_commas(), PROTEIN_SIZE.separate_with_commas(), protein_x.len(), protein_y.len());

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

fn run_prime() {
    let start = Instant::now();
    let primes = sieve_of_atkin::get_primes(&PRIME_LIMIT);
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
    println!("Prime millis: {}. Prime limit: {}. Prime amount: {}", duration.as_millis().separate_with_commas(), PRIME_LIMIT.separate_with_commas(), primes.len());
}

fn run_aes() {
    let plain: String = String::from("Hello world, I'm testing my algorithm");
    let key = String::from("3533363835363644353937313333373333363736333937393234343232363435");
    
    let cipher = aes_encrypt(plain.into_bytes(), hex::decode(key.clone()).expect("Decoding failed"));
    println!("Encrypted: {:?}", hex::encode(cipher.clone()));

    let new_plain = aes_decrypt(cipher, hex::decode(key).expect("Decoding failed"));
    println!("Decrypted: {:?}", String::from_utf8_lossy(&new_plain));
}