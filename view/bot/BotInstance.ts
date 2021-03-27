
export enum BotCurrency {
    BITCOIN = "BTC",
    ETHER = "ETH",
}

export enum BotStrategy {
    DCA = "Dollar-Cost Average",
}

export const enum BotStatus {
    RUNNING = 0,
    PAUSED  = 1,
    STOPPED = 2,
}

// TODO: represent this in a more type-safe way
export interface BotInstance<TOpt> {
    id: string;
    name: string;
    strategy: BotStrategy;
    currency: BotCurrency;
    status: BotStatus;
    options?: TOpt;
}
