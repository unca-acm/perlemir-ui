import React from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Stack,
    Radio,
    RadioGroup,
    Input,
} from "@chakra-ui/react";

import { BotCurrency, BotInstance, BotStatus, BotStrategy } from "./BotInstance";

/**
 * React component which can be nested inside a custom form.
 * Any custom, strategy-specific form logic should be placed inside a component of this type.
 * Then, wrap this component with the `withCustomForm()` function to create a fully-featured form.
 * 
 * @template T Type of strategy-specific options the form should expect
 */
export type CustomFormOptions<T> = React.FC<{
    /** Container for strategy-specific options */
    options: T;
    /**
     * Callback to be called when the inner form's stored options change.
     * The new options are then reflected in the wrapping form.
     * 
     * @param options Object containing the new value of the bot instance's custom options
     */
    onUpdate: (options: T) => void;
}>;

/**
 * @template T Type of custom, strategy-specific options specified for the bot instance
 */
interface BotCustomFormProps<T> {
    /**
     * Callback to be run once the form is ready to be submitted.
     * The given instance is expected to be 
     * 
     * @param instance Completed, new bot instance to be sent to the server
     */
    onSubmit: (instance: BotInstance<T>) => void;
}
type CustomForm<T> = React.FC<BotCustomFormProps<T>>;

/**
 * Wrapper function to automagically inject custom strategy-specific controls into a form.
 * For each bot type, use this wrapper to be used in the Bot Creation panel.
 * The "universal" options, like the bot name, currency, and strategy will autmatically be injected.
 * Include any form logic unique to that particular bot type in the CustomForm component.
 * 
 * Any child components passed in will be rendered at the start of the form.
 * A higher-order component is used to allow for a much greater degree of type-safety.
 * 
 * @param CustomForm Inner form component containing strategy-specific controls
 * @param strategy Enum value of strategy to use
 * @param initialOptions Value of strategy-specific options on initialization
 * @returns React component containing custom form logic
 */
export const withCustomForm = function<T>(
    CustomForm: CustomFormOptions<T>,
    strategy: BotStrategy,
    initialOptions: T
): CustomForm<T> {
    return function CustomFormComponent(props) {
        const [ instance, setInstance ] = React.useState<BotInstance<T>>({
            id: (Math.round(Math.random() * 9999999999)).toString(16),
            name: "No Name",
            currency: BotCurrency.BITCOIN,
            status: BotStatus.PAUSED,
            strategy,
        });
        const [ options, setOptions ] = React.useState<T>(initialOptions);

        return (
            <form>
                {props.children}
                <CustomForm options={options} onUpdate={opts => setOptions(opts)}>
                    <FormControl>
                        <FormLabel>Bot Name</FormLabel>
                        <Input onChange={ev => setInstance({ ...instance, name: ev.target.value })} />
                    </FormControl>

                    <FormControl isRequired={true}>
                        <FormLabel htmlFor="bot-create-currency">Currency</FormLabel>
                        <RadioGroup
                            onChange={text => setInstance({
                                ...instance,
                                currency: text as BotCurrency
                            })}
                            value={instance.currency}
                        >
                            <Stack direction="row">
                                <Radio value={BotCurrency.BITCOIN}>Bitcoin</Radio>
                                <Radio value={BotCurrency.ETHER}>Ether</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                </CustomForm>

                <Button onClick={() => props.onSubmit({ ...instance, options })}>Submit</Button>
            </form>
        );
    };
};
