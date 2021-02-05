import React from 'react';
//import WasmTest from '../src/WasmTest';
import WasmTest from './WasmTest';

const App: React.FC = function() {
    return (
        <div>
            <p>If you are intending to work with the transform library, you'll need to install: Make, Clang, LLVM, and the WebAssembly Binary Toolkit first.</p>
            <p>If the transform library is working, you'll see the number 1337 under "Result".</p>
            <WasmTest />
        </div>
    );
};

export default App;