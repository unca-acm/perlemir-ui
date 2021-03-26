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
    Stack,
    Radio,
    RadioGroup,
    Input,
    Select
} from "@chakra-ui/react";

import { BotCurrency, BotInstance, BotStatus, BotStrategy, getDefaultOptions } from "./BotInstance";
import { DCACreateOptions } from "./dca/BotCardDCA";

interface BotControlPanelProps {
    onCreate: (instance: BotInstance) => void;
    onDelete: (botId: string) => void;
}

type BotCreateEvent = (instance: BotInstance) => void;
interface BotCreateFormProps {
    onSubmit: (instance: BotInstance) => void;
}

const BotCreateForm: React.FC<BotCreateFormProps> = function(props) {
    const [ instance, setInstance ] = React.useState<BotInstance<typeof options>>({
        id: (Math.round(Math.random() * 9999999999)).toString(16),
        name: "No Name",
        currency: BotCurrency.BITCOIN,
        status: BotStatus.PAUSED,
        strategy: BotStrategy.DCA,
    });
    const [ options, setOptions ] = React.useState<any>(getDefaultOptions(instance.strategy));

    const strategyHandler: React.ChangeEventHandler<HTMLSelectElement> = function(ev) {
        if (ev.target.value in BotStrategy) {
            setInstance({ ...instance, strategy: ev.target.value });
        }
    };

    return (
        <form>
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

            <FormControl isRequired={true}>
                <FormLabel htmlFor="bot-create-strategy">Investment Strategy</FormLabel>
                <Select id="bot-create-strategy" isRequired={true} onChange={strategyHandler}>
                    <option value="strategy=DCA">Dollar-Cost Average</option>
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Settings ({instance.strategy})</FormLabel>
                <DCACreateOptions onUpdate={opt => setOptions(opt)} options={options} />
            </FormControl>

            <Button onClick={() => props.onSubmit({ ...instance, options })}>Submit</Button>
        </form>
    );
};

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
