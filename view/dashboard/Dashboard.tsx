import React from "react";
import { Grid, Box } from "@chakra-ui/react";

import { DataStore, DataView } from "../data/DataContext";
import { PriceVisualizer } from "./graph/Visualizers";
import { BotInstance } from "../bot/types";
import { ExampleBotInstances } from "../bot/testBots";
import BotControlPanel from "../bot/BotControlPanel";
import BotCardDCA from "../bot/dca/BotCardDCA";

interface DashboardProps {
    plotSize: { width: number, height: number };
}

const Dashboard: React.FC<DashboardProps> = function(props) {
    const [ botInstances, setBotInstances ] = React.useState<{ [id: string]: BotInstance }>(ExampleBotInstances);

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
                    onDelete={botId => {
                        if (!botInstances[botId]) {
                            return;
                        }
                        delete botInstances[botId];
                        setBotInstances({ ...botInstances });
                    }}
                />
                {Object.values(botInstances).map(instance => (
                    <BotCardDCA
                        key={instance.id}
                        name={instance.id}
                        instance={instance}
                        dispatch={val => {
                            Object.assign(botInstances[instance.id], val);
                            setBotInstances({ ...botInstances });
                        }}
                    />
                ))}
            </Box>
        </Grid>
    );
};

export default Dashboard;
