
import { defaultOptions as DCAOpts } from "./dca/BotDCA";

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
export interface BotInstance<TOpt = any> {
    id: string;
    name: string;
    strategy: string;
    currency: BotCurrency;
    status: BotStatus;
    options?: TOpt;
}

export interface BotContext {
    updateBotInstance: (updated: Partial<BotInstance>) => void;
}

export const getDefaultOptions = function(strategy: BotStrategy) {
    switch (strategy) {
    case BotStrategy.DCA:
    default:
        return DCAOpts;
    }
}
