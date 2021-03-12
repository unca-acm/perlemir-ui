import React from 'react';
import { ChakraProvider, CSSReset, Grid } from "@chakra-ui/react";

import { PriceVisualizer } from './dashboard/graph/Visualizers';
import { DataStore, DataView } from "./data/DataContext";
import BotControlView from "./bot/BotControlView";
import appTheme from "./theme/appTheme";

import "./app.css";
// This is used for testing; remove when active
import { ExampleBotInstances } from "./bot/testBots";

const App: React.FC = function() {
    const plotSize = { width: 600, height: 400 };

    return (
        <ChakraProvider resetCSS={false} theme={appTheme}>
            <Grid backgroundColor="white" id="app-grid" gap={"1em"} templateColumns={"60% 40%"}>
                <DataStore>
                    <DataView>
                        {({ dataBlock }) => (
                            <PriceVisualizer
                                priceData={dataBlock["historical"]}
                                plotSize={plotSize}/>
                        )}
                    </DataView>
                </DataStore>
                <BotControlView instances={ExampleBotInstances} />
            </Grid>
            <CSSReset />
        </ChakraProvider>
    );
};

export default App;