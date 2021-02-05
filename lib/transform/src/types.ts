

export abstract class ITransformer {
    protected memory: Uint8Array;

    constructor(
        protected context: WebAssembly.WebAssemblyInstantiatedSource,
        protected rawMemory: WebAssembly.Memory
    ) {
        this.memory = new Uint8Array(rawMemory.buffer);
    }
}
