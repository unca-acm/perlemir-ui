import React from "react";
import {
    useDisclosure,
    Button,
    ButtonGroup,
    Drawer,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerContent,
    DrawerBody,
    DrawerHeader,
    FormControl,
    FormLabel,
    Select
} from "@chakra-ui/react";

import { BotInstance, BotStrategy } from "./BotInstance";
import { DCACustomForm } from "./dca/BotCardDCA";

type BotCreateEvent = (instance: BotInstance<unknown>) => void;
interface BotCreateFormProps {
    /**
     * Callback to be run when the entered data is ready to be submitted to the server.
     * 
     * @param instance Valid, newly-created bot instance record, representing a bot
     *   to be created on the server.
     */
    onSubmit: BotCreateEvent;
}

const BotCreateForm: React.FC<BotCreateFormProps> = function(props) {
    const [ strategy, setStrategy ] = React.useState<BotStrategy>(BotStrategy.DCA);
    const strategyHandler: React.ChangeEventHandler<HTMLSelectElement> = function(ev) {
        if (ev.target.value in BotStrategy) {
            setStrategy(ev.target.value as BotStrategy);
        }
    };

    // Selects the appropriate custom form based on what strategy is specified.
    // Memoized so that this selection process only occurs when the strategy is changed.
    const StrategyForm = React.useMemo(function() {
        switch (strategy) {
        case BotStrategy.DCA:
        default:
            return DCACustomForm;
        }
    }, [ strategy ]);

    return (
        <StrategyForm onSubmit={instance => props.onSubmit(instance)}>
            <FormControl isRequired={true}>
                <FormLabel htmlFor="bot-create-strategy">Investment Strategy</FormLabel>
                <Select id="bot-create-strategy" isRequired={true} onChange={strategyHandler}>
                    <option value="strategy=DCA">Dollar-Cost Average</option>
                </Select>
            </FormControl>
        </StrategyForm>
    );
};

interface BotControlPanelProps {
    /**
     * Callback for creating new bot instances and making them available globally.
     * The new bot will be reflected on the server, and then updated locally.
     * 
     * @param instance Valid, newly-created bot instance record, representing a bot
     *   to be created on the server.
     */
    onCreate: BotCreateEvent;
}

/**
 * Control panel which is used to perform general actions on the group of bots.
 * Typically used for general actions like creating, deleting, or reading values from all bots.
 * 
 * Contains an "overlay" when buttons are pressed.
 * When the Create button is pressed, a Bot Create form is displayed.
 */
const BotControlPanel: React.FC<BotControlPanelProps> = function(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const buttonHandle = React.useRef();

    const submitHandler: BotCreateEvent = function(event) {
        props.onCreate(event);
        onClose();
    };

    return (
        <div>
            <ButtonGroup w="100%" variant="solid" colorScheme="perlemirAccent">
                <Button ref={buttonHandle} onClick={onOpen}>
                    Create
                </Button>
                <Button colorScheme="red">Delete</Button>
            </ButtonGroup>

            <Drawer size="md"
                isOpen={isOpen}
                onClose={onClose}
                placement="right"
                finalFocusRef={buttonHandle}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Create New Bot</DrawerHeader>

                        <DrawerBody>
                            <BotCreateForm onSubmit={submitHandler} />
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </div>
    );
};

export default BotControlPanel;
