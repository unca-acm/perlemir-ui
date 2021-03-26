import React from "react";
import { NumberInput, NumberInputField } from "@chakra-ui/react";

import * as BotDCA from "./BotDCA";
import { withInstanceCard, BotCreateOptionsProps } from "../BotInstanceCard";
import { BotInstance } from "../BotInstance";

export interface BotCardDCA {
    instance: BotInstance;
}

const BotCardDCA: React.FC<BotCardDCA> = function(props) {
    const instance = props.instance.options as BotDCA.Options;
    return (
        <div>
            <h1>Amount: ${instance.amount}</h1>
        </div>
    );
};


type OptionsProps = BotCreateOptionsProps<BotDCA.Options>;
export const DCACreateOptions: React.FC<OptionsProps> = function(props) {

    const updateOptions = function(s: string, num: number) {
        props.onUpdate({ ...props.options, amount: !isNaN(num) ? num : 0 });
    }

    return (
        <NumberInput onChange={updateOptions} value={props.options.amount}>
            <NumberInputField />
        </NumberInput>
    );
};

export default withInstanceCard(BotCardDCA, "Dollar-Cost Average");