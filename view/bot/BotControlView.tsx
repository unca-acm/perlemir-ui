import React from "react";
import { Box } from "@chakra-ui/react";

import { BotInstanceCard } from "./card/BotInstance";
import "./bot-styles.css";
import {BotInstance} from "./types";

interface BotControlViewProps {
    instances: { [botId: string]: BotInstance };
}

const BotControlView: React.FC<BotControlViewProps> = function(props) {
    return (
        <Box w="100%" p={4} color="white">
            {Object.values(props.instances).map(instance => (
                <BotInstanceCard
                    id={instance.id}
                    key={instance.id}
                    name={instance.name}
                    currency={instance.currency}
                    status={instance.status}
                />
            ))}
        </Box>
    );
};

export default BotControlView;
