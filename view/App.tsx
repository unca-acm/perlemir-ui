import React from 'react';
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

import Dashboard from "./dashboard/Dashboard";
import appTheme from "./theme/appTheme";
import "./app.css";

const App: React.FC = function() {
    const plotSize = { width: 600, height: 400 };

    return (
        <ChakraProvider resetCSS={false} theme={appTheme}>
            <Dashboard plotSize={plotSize} />
            <CSSReset />
        </ChakraProvider>
    );
};

export default App;