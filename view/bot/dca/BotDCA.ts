import { BotInstance } from "../BotInstance";

export interface Options {
    amount: number;
}
export type Instance = BotInstance<Options>;

export const defaultOptions: Options = {
    amount: 0.0,
};
