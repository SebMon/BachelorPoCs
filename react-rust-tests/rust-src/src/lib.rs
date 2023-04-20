use needleman_wunsch::calculate_score;
use sieve_of_atkin::get_primes;
use wasm_bindgen::prelude::*;

mod needleman_wunsch;
mod sieve_of_atkin;
mod aes;

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
    let output: (Vec<char>, Vec<char>) = calculate_score(&input_vec1, &input_vec2);
    format!("S1 length: {}. S2 length: {}.", output.0.len(), output.1.len())
}

#[wasm_bindgen]
pub fn calculate_primes(limit: usize) -> String {
    let primes = get_primes(&limit);
    format!("Primes: {}.", primes.len())
}

#[wasm_bindgen]
pub fn aes_encrypt(data: Vec<u8>, key: Vec<u8>) -> Vec<u8> {
    aes::aes_encrypt(data, key)
}

#[wasm_bindgen]
pub fn aes_decrypt(data: Vec<u8>, key: Vec<u8>) -> Vec<u8> {
    aes::aes_decrypt(data, key)
}