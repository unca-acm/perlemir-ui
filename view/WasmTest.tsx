import React from 'react';

import { HelloTransformBuilder, HelloTransformer } from "@unca-acm/lib-transform";

const wasmTestLog = async function(): Promise<() => Promise<string>> {
    const wasmTask = async function(bin: Promise<ArrayBuffer>): Promise<HelloTransformer> {
        const lib = await new HelloTransformBuilder().compile(bin);
        return await lib.instantiate();
    };

    const binFetch = fetch("/bin/hello.wasm").then(bin => bin.arrayBuffer());
    const transform = await wasmTask(binFetch);
    return transform.sayHello;
}

export default wasmTestLog;