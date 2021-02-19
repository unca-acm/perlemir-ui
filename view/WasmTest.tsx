import React from 'react';

import { HelloTransformBuilder } from "@unca-acm/lib-transform";

const WasmTest: React.FC = function() {
    const [result, setResult]: [string, (newResult: string) => void] = React.useState("");

    React.useEffect(function() {
        const wasmTask = async function(bin: Promise<ArrayBuffer>): Promise<string> {
            const lib = await new HelloTransformBuilder().compile(bin);
            const transform = await lib.instantiate();
            return await transform.sayHello();
        };

        const binFetch = fetch("/bin/hello.wasm").then(bin => bin.arrayBuffer());
        wasmTask(binFetch).then(hello => setResult(hello));
    }, [ setResult ]);

    return (
        <div>
            <h1>WebAssembly says:</h1>
            <h2>{result}</h2>
            <p>(If not available, you'll see an error. This is normal.)</p>
        </div>
    );
};

export default WasmTest;