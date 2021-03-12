
export const enum BotCurrency {
    BITCOIN = "BTC",
    ETHER = "ETH",
}

export const enum BotStatus {
    RUNNING = 0,
    PAUSED  = 1,
    STOPPED = 2,
}

export interface BotInstance {
    id: string;
    name: string;
    currency: BotCurrency;
    status: BotStatus;
}
