import React from 'react';
import WasmTest from './WasmTest';

import { PriceVisualizer } from './dashboard/graph/Visualizers';
import { DataStore, DataView } from "./data/DataContext";

const App: React.FC = function() {
    const plotSize = { width: 600, height: 400 };

    // Run the wasmTest function if it's available
    // Only run once, on the initial render
    React.useEffect(function() {
        WasmTest().then(async func => await func());
    }, []);

    return (
        <DataStore>
            <DataView>
                {({ dataBlock }) => (
                    <PriceVisualizer
                        priceData={dataBlock["historical"]}
                        plotSize={plotSize}/>
                )}
            </DataView>
            <p>If you are intending to work with the transform library, you'll need to install:
                Make, Clang, LLVM, and the WebAssembly Binary Toolkit first.</p>
            <p>If the transform library is working, you'll see the number 1337 under "Result".</p>
        </DataStore>
    );
};

export default App;