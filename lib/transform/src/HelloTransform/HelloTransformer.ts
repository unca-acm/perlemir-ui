import { ITransformer } from "../types";

export default class HelloTransformer extends ITransformer {
    private constructor(
        context: WebAssembly.WebAssemblyInstantiatedSource,
        rawMemory: WebAssembly.Memory
    ) {
        super(context, rawMemory);
        this.sayHello = <() => number> context.instance.exports.say_hello;
    }

    /**
     * Converts a .wasm binary into an instance of the provided transformer.
     * 
     * @param bin Buffer containing the compiled/fetched .wasm file
     */
    public static async instantiate(bin: ArrayBuffer): Promise<HelloTransformer> {
        const rawMemory = new WebAssembly.Memory({ initial: 1 });
        return new HelloTransformer(
            await WebAssembly.instantiate(bin, { js: { memory: rawMemory } }),
            rawMemory
        );
    }

    /* WASM-defined methods
     * TODO: find a better way to declare methods imported from WebAssembly.
     * For now, this is done with a static cast.
     */

    public sayHello: () => number;
}