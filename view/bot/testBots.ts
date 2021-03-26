import {BotCurrency, BotInstance, BotStatus, BotStrategy} from "./types";

export const ExampleBotInstances: { [id: string]: BotInstance } = {
    "123-abc": {
        id: "123-abc",
        name: "My First Bot",
        currency: BotCurrency.BITCOIN,
        status: BotStatus.RUNNING,
        strategy: BotStrategy.DCA,
        options: {
            amount: 2.14,
        }
    },
    "923-bcd": {
        id: "923-bcd",
        name: "My Second Bot",
        currency: BotCurrency.ETHER,
        status: BotStatus.RUNNING,
        strategy: BotStrategy.DCA,
        options: {
            amount: 3.99,
        }
    },
    "426-abd": {
        id: "426-abd",
        name: "My Third Bot",
        currency: BotCurrency.BITCOIN,
        status: BotStatus.RUNNING,
        strategy: BotStrategy.DCA,
        options: {
            amount: 10.41,
        }
    }
};