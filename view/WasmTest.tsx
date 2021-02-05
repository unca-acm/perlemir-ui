import React from 'react';

import { getTransform } from "./import/transform";

const WasmTest: React.FC = function() {
    const [result, setResult]: [string, (newResult: string) => void] = React.useState("");

    React.useEffect(function() {
        // TODO: show off WASM build!
        getTransform()
            .then(sayHello => setResult(sayHello().toString()))
            .catch(() => setResult("IMPORT NOT AVAILABLE"));
    }, [ setResult ]);

    return (
        <div>
            <h1>Result:</h1>
            {result}
            <p>(If not available, you'll see an error. This is 100% normal!)</p>
        </div>
    );
};

export default WasmTest;