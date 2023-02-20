# React assemblyscript

This project is a PoC of compiling Assemblyscript to WebAssembly and using it in a react web app

## Building and running

The AssemblyScript is compiled with 

```
npm run asbuild
```

This is saved as a vscode task and can be run with `ctrl+shift+B` or by pressing Terminal > Run Build Task

The web application is run with 

```
npm start
```

## Changing WebAssembly module

When a function is added, altered or removed from the assemblyScript module (assembly/module.ts) the modules type declaration should be changed in src/wasm.d.ts. For more comlicated stuff than simple math functions, the instantiation logic in wasm.js might also need to be changed.