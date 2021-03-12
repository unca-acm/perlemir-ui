import React from "react";
import { Grid } from "@chakra-ui/react";

import { DataStore, DataView } from "../data/DataContext";
import { PriceVisualizer } from "./graph/Visualizers";
import BotControlView from "../bot/BotControlView";
import { BotInstance, BotContext } from "../bot/types";
import { ExampleBotInstances } from "../bot/testBots";

interface DashboardProps {
    plotSize: { width: number, height: number };
}

const Dashboard: React.FC<DashboardProps> = function(props) {
    const [ botInstances, setBotInstances ] = React.useState<{ [id: string]: BotInstance }>(ExampleBotInstances);

    const createBotContext = function(botId: string): BotContext {
        if (!botInstances[botId]) {
            throw new Error(`Cannot update bot status: ${botId} not found`);
        }

        return {
            updateBotInstance: function(updated) {
                const { [botId]: previousInstance } = botInstances;
                Object.assign(previousInstance, updated);
                setBotInstances({
                    ...botInstances,
                });
            },
        };
    }

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
            <BotControlView
                instances={botInstances}
                selectBot={createBotContext}
            />
        </Grid>
    );
};

export default Dashboard;
