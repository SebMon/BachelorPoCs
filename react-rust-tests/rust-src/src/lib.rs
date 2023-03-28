use needleman_wunsch::calculate_score;
use sieve_of_atkin::get_primes;
use wasm_bindgen::prelude::*;
use instant::*;

mod needleman_wunsch;
mod sieve_of_atkin;

#[wasm_bindgen]
pub fn fib(a: i32) -> i32 {
    if a<=1 {
        return a;
    }
    fib(a-1) + fib(a-2)
}


#[wasm_bindgen]
pub fn proteins(input1: String, input2: String) -> String {
    let mut input_vec1 = Vec::new();
    let mut input_vec2 = Vec::new();

    for c in input1.chars() {
        input_vec1.push(c);
    }

    for c in input2.chars() {
        input_vec2.push(c);
    }
    
    let start = Instant::now();
    let output: (Vec<char>, Vec<char>) = calculate_score(&input_vec1, &input_vec2);
    let duration = start.elapsed();
    format!("S1 length: {}. S2 length: {}. Millis: {}.", output.0.len(), output.1.len(), duration.as_millis())
}

#[wasm_bindgen]
pub fn calculate_primes(limit: usize) -> String {
    let start = Instant::now();
    let primes = get_primes(&limit);
    let duration = start.elapsed();
    format!("Primes: {}. Millis: {}", primes.len(), duration.as_millis())
}