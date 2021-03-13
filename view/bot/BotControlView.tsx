import React from "react";
import { Box } from "@chakra-ui/react";

import BotCardDCA from "./card/BotCardDCA";
import BotControlPanel from "./BotControlPanel";
import { BotInstance, BotContext } from "./types";
import "./bot-styles.css";

interface BotControlViewProps {
    instances: { [botId: string]: BotInstance };
    selectBot: (id: string) => BotContext;
}

const BotControlView: React.FC<BotControlViewProps> = function(props) {
    return (
        <Box w="100%" p={4} color="white">
            <BotControlPanel />
            {Object.values(props.instances).map(instance => {
                return (
                    <BotCardDCA
                        name={instance.id}
                        instance={instance}
                        context={props.selectBot(instance.id)}
                    />
                );
            })}
        </Box>
    );
};

export default BotControlView;
