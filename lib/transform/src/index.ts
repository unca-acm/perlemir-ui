/**
 * TODO: 
 */

import HelloTransformer from "./HelloTransform/HelloTransformer";

export type BinModule = "hello";

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

    public async HelloModule(): Promise<HelloTransformer> {
        const bin: ArrayBuffer = await this.fetch("hello");
        return await HelloTransformer.instantiate(bin);
    }
}
