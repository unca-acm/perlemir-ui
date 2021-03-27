import React from "react";
import { NumberInput, NumberInputField, FormLabel } from "@chakra-ui/react";

import * as BotDCA from "./BotDCA";
import { withCustomForm, CustomFormOptions } from "../BotCustomForm";
import { withInstanceCard, BotCardOptionsComponent } from "../BotInstanceCard";
import { BotStrategy } from "../BotInstance";

export interface BotCardDCAProps {
    instance: BotDCA.Instance;
}

const BotCardDCA: BotCardOptionsComponent<BotDCA.Options> = function(props) {
    const instance = props.instance.options as BotDCA.Options;
    return (
        <div>
            <h1>Amount: ${instance.amount}</h1>
        </div>
    );
};


const DCACreateOptions: CustomFormOptions<BotDCA.Options> = function(props) {

    const updateOptions = function(s: string, num: number) {
        props.onUpdate({ ...props.options, amount: !isNaN(num) ? num : 0 });
    }

    return (
        <div>
            {props.children}
            <FormLabel isRequired={false}>Amount</FormLabel>
            <NumberInput onChange={updateOptions}>
                <NumberInputField />
            </NumberInput>
        </div>
    );
};

export const DCACustomForm = withCustomForm(DCACreateOptions, BotStrategy.DCA, { amount: 0.0 });
export default withInstanceCard(BotCardDCA, "Dollar-Cost Average");
