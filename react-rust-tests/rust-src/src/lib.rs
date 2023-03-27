use needleman_wunsch::calculate_score;
use wasm_bindgen::prelude::*;
use instant::*;

mod needleman_wunsch;

#[wasm_bindgen]
pub fn fib(a: i32) -> i32 {
    if a<=1 {
        return a;
    }
    fib(a-1) + fib(a-2)
}


#[wasm_bindgen]
pub fn proteins(input1: String, input2: String) -> String {
    let outer_start = Instant::now();
    let mut input_vec1 = Vec::new();
    let mut input_vec2 = Vec::new();

    for c in input1.chars() {
        input_vec1.push(c);
    }

    for c in input2.chars() {
        input_vec2.push(c);
    }
    
    let inner_start = Instant::now();
    let output: (Vec<char>, Vec<char>) = calculate_score(&input_vec1, &input_vec2);
    let inner_duration = inner_start.elapsed();

    let s: String = output.0.iter().collect();
    let s2: String = output.1.iter().collect();
    let outer_duration = outer_start.elapsed();
    let timing = &format!("\nOuter WASM time: {}\nInner WASM time: {}", outer_duration.as_millis(), inner_duration.as_millis());
    s + "\n" + &s2 + timing
}