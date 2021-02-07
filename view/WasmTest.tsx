import React from 'react';

import { getTransform } from "./import/transform";

const WasmTest: React.FC = function() {
    const [result, setResult]: [string, (newResult: string) => void] = React.useState("");

    React.useEffect(function() {
        // TODO: show off WASM build!
        getTransform()
            .then(sayHello => sayHello())
            .then(res => setResult(res))
            .catch((err) => {
                console.error(err);
                setResult("IMPORT NOT AVAILABLE")
            });
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