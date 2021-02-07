/**
 * TODO: 
 */

import HelloTransformer, { HelloTransformBuilder } from "./HelloTransform/HelloTransformer";

type BinModule = "hello" | "test";

export class TransformContext {
    private rootPath: string;
    private module: WebAssembly.WebAssemblyInstantiatedSource;
    
    constructor(relativePath: string = "") {
        this.rootPath = `${relativePath}`;
    }

    private async fetch(moduleName: BinModule): Promise<ArrayBuffer> {
        const response = await fetch(`${this.rootPath}/${moduleName}.wasm`);
        return await response.arrayBuffer();
    }

    /**
     * Create an instance of the Hello transformer
     * 
     * @returns Promise which resolves to an instance of the Hello transformer
     */
    public async HelloModule(): Promise<HelloTransformer> {
        // TODO: memoize the fetch/compile process
        const bin: Promise<ArrayBuffer> = this.fetch("test");
        const transform = await new HelloTransformBuilder(await bin).instantiate();
        return transform.start();
    }
}
