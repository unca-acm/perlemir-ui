import {BotCurrency, BotInstance, BotStatus} from "./types";

export const ExampleBotInstances: { [id: string]: BotInstance } = {
    "123-abc": {
        id: "123-abc",
        name: "My First Bot",
        currency: BotCurrency.BITCOIN,
        status: BotStatus.RUNNING,
    },
    "123-bcd": {
        id: "123-bcd",
        name: "My Second Bot",
        currency: BotCurrency.ETHER,
        status: BotStatus.RUNNING,
    },
    "426-abd": {
        id: "426-abd",
        name: "My Third Bot",
        currency: BotCurrency.BITCOIN,
        status: BotStatus.RUNNING,
    }
};