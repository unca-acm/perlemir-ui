import React from "react";

import { withInstanceCard } from "./BotInstance";
import { BotInstance } from "../types";

export interface BotCardDCA {
    instance: BotInstance;
}

interface DCAInstance {
    amount: number;
}

const BotCardDCA: React.FC<BotCardDCA> = function(props) {
    const instance = props.instance.settings as DCAInstance;
    return (
        <div>
            <h1>Amount: ${instance.amount}</h1>
        </div>
    );
};

export default withInstanceCard(BotCardDCA, "Dollar-Cost Average");