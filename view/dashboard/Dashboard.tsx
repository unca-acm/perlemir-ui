import React from "react";
import { Grid, Box } from "@chakra-ui/react";

import { DataStore, DataView } from "../data/DataContext";
import { PriceVisualizer } from "./graph/Visualizers";
import { BotInstance } from "../bot/BotInstance";
import BotControlPanel from "../bot/BotControlPanel";
import BotCardDCA from "../bot/dca/BotCardDCA";
import * as BotDCA from "../bot/dca/BotDCA";

interface DashboardProps {
    plotSize: { width: number, height: number };
}

const Dashboard: React.FC<DashboardProps> = function(props) {
    const [ botInstances, setBotInstances ] = React.useState<{ [id: string]: BotInstance<unknown> }>({});

    return (
        <Grid backgroundColor="white" id="app-grid" gap="1em" templateColumns="60% 40%">
            <DataStore>
                <DataView>
                    {({ dataBlock }) => (
                        <PriceVisualizer
                            priceData={dataBlock["historical"]}
                            plotSize={props.plotSize}
                        />
                    )}
                </DataView>
            </DataStore>
            <Box w="100%" p={4} color="white">
                <BotControlPanel
                    onCreate={instance => {
                        setBotInstances({ [instance.id]: instance, ...botInstances });
                    }}
                />
                {Object.keys(botInstances).length > 0 ? Object.values(botInstances).map(instance => (
                    <BotCardDCA
                        key={instance.id}
                        instance={instance as BotDCA.Instance}
                        dispatch={val => {
                            Object.assign(botInstances[instance.id], val);
                            setBotInstances({ ...botInstances });
                        }}
                    />
                )) : (
                    <div>
                        <h1 style={{ color: "black" }}>No bots active</h1>
                    </div>
                )}
            </Box>
        </Grid>
    );
};

export default Dashboard;
