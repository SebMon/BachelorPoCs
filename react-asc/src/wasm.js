export default async function init() {
    const obj = await WebAssembly.instantiateStreaming(fetch("module.wasm"))

    return obj.instance.exports;
}
