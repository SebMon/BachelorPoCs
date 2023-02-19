# Rust-wasm PoC
This script is a PoC of using rust to compile web assembly, and embed that webassembly into a react app

## Building wasm
The webassembly can be build by going to the src-wasm folder and running
```
wasm-pack build --target web
```

A VSCode task for doing this is configure, it can be run with `ctrl+shift+b` or by pressing Terminal > Run build task

## Running the app

The app is run with 
```
npm start
```