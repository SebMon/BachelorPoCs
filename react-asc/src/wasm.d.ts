interface wasmModule {
    add: (a: number, b: number) => number
}

export default async function init(): Promise<wasmModule>