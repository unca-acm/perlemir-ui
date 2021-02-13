import React from 'react';
import WasmTest from './WasmTest';

import { PriceVisualizer } from './dashboard/graph';
import { DataStore, DataView } from "./data/DataContext";

const App: React.FC = function() {
    const plotSize = { width: 1200, height: 400 };
    return (
        <DataStore>
            <WasmTest />
            <DataView>
                {({ data }) => (
                    <PriceVisualizer priceData={data} plotSize={plotSize}/>
                )}
            </DataView>
            <p>If you are intending to work with the transform library, you'll need to install:
                Make, Clang, LLVM, and the WebAssembly Binary Toolkit first.</p>
            <p>If the transform library is working, you'll see the number 1337 under "Result".</p>
        </DataStore>
    );
};

export default App;