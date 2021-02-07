

export abstract class ITransformer {
    protected memory: Uint8Array;

    constructor(
        protected module: WebAssembly.Module,
        protected rawMemory: WebAssembly.Memory
    ) {
        this.memory = new Uint8Array(rawMemory.buffer);
    }

    protected abstract start(): void;
}

export abstract class ITransformBuilder<I extends ITransformer> {
    protected compileTask: Promise<WebAssembly.Module>;
    constructor(
        bin: ArrayBuffer
    ) {
        this.compileTask = this.compile(bin);
    }

    public abstract instantiate(): Promise<I>;
    protected abstract compile(bin: ArrayBuffer): Promise<WebAssembly.Module>;
    protected abstract getDefaultExports(memory: WebAssembly.Memory): WebAssembly.Imports;
}