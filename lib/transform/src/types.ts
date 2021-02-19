

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
    protected compileTask: Promise<WebAssembly.Module>
        = Promise.reject("Transform instance not found; compile a valid WebAssembly binary before instantiating");

    public abstract instantiate(): Promise<I>;
    public abstract compile(bin: Promise<ArrayBuffer>): Promise<WebAssembly.Module>;
    protected abstract getDefaultImports(memory: WebAssembly.Memory): WebAssembly.Imports;
}