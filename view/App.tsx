import React from 'react';
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

import { PriceVisualizer } from './dashboard/graph/Visualizers';
import { DataStore, DataView } from "./data/DataContext";

import "./app.css";

const App: React.FC = function() {
    const plotSize = { width: 600, height: 400 };

    return (
        <ChakraProvider resetCSS={false}>
            <DataStore>
                <DataView>
                    {({ dataBlock }) => (
                        <PriceVisualizer
                            priceData={dataBlock["historical"]}
                            plotSize={plotSize}/>
                    )}
                </DataView>
            </DataStore>
            <CSSReset />
        </ChakraProvider>
    );
};

export default App;