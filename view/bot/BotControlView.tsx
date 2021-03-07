import React from "react";
import { Box } from "@chakra-ui/react";

import { BotInstanceCard } from "./card/BotInstance";
import "./bot-styles.css";

type BotControlViewProps = any;

const BotControlView: React.FC<BotControlViewProps> = function() {
    return (
        <Box w="100%" p={4} color="white">
            <BotInstanceCard></BotInstanceCard>
        </Box>
    );
};

export default BotControlView;
