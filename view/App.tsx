import React from 'react';
import WasmTest from './WasmTest';

import { PriceVisualizer } from './dashboard/graph';

// Create a set of random test data.
const testData = new Uint32Array(10);
testData.forEach((d, i) => testData[i] = (Math.random() * 20 + 20) * i);

const App: React.FC = function() {
    return (
        <div>
            <WasmTest />
            <PriceVisualizer priceData={testData} plotSize={{ width: 1200, height: 400 }} />
            <p>If you are intending to work with the transform library, you'll need to install:
                Make, Clang, LLVM, and the WebAssembly Binary Toolkit first.</p>
            <p>If the transform library is working, you'll see the number 1337 under "Result".</p>
        </div>
    );
};

export default App;