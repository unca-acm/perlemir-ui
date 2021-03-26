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
    NumberInput,
    NumberInputField,
    Select
} from "@chakra-ui/react";

import { BotCurrency, BotInstance, BotStatus, BotStrategy } from "./types";
import { BotOptionsDCA } from "./dca/BotDCA";

interface BotControlPanelProps {
    onCreate: (instance: BotInstance) => void;
    onDelete: (botId: string) => void;
}

type BotCreateEvent = (instance: BotInstance) => void;
interface BotCreateFormProps {
    onSubmit: (instance: BotInstance) => void;
}

const BotCreateForm: React.FC<BotCreateFormProps> = function(props) {
    const [ strategy, setStrategy ] = React.useState<BotStrategy>(BotStrategy.DCA);
    const [ botName, setBotName ] = React.useState<string>("");
    const [ currency, setCurrency ] = React.useState<BotCurrency>(BotCurrency.BITCOIN);
    const [ options, setOptions ] = React.useState<BotOptionsDCA>({ amount: 0.0 });

    const strategyHandler: React.ChangeEventHandler<HTMLSelectElement>
        = ev => setStrategy((ev.target.value in BotStrategy) ? ev.target.value as BotStrategy : strategy);
    const parseAmount = (amt: number) => setOptions({ amount: parseFloat(amt.toFixed(2)) });

    return (
        <form>
            <FormControl>
                <FormLabel>Bot Name</FormLabel>
                <Input onChange={ev => setBotName(ev.target.value)} />
            </FormControl>

            <FormControl isRequired={true}>
                <FormLabel htmlFor="bot-create-currency">Currency</FormLabel>
                <RadioGroup onChange={text => text in BotCurrency && setCurrency(text as BotCurrency)}>
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

            <FormControl isRequired={true}>
                <FormLabel htmlFor="bot-create-dca-amount">Amount</FormLabel>
                <NumberInput size="sm" onChange={(str, num) => parseAmount(num)} defaultValue={0.0} clampValueOnBlur={true}>
                    <NumberInputField />
                </NumberInput>
            </FormControl>

            <Button onClick={() => props.onSubmit({
                name: botName,
                id: botName,
                currency,
                strategy,
                status: BotStatus.RUNNING,
                options,
            })}>Submit</Button>
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
