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
    DrawerHeader 
} from "@chakra-ui/react";

type BotControlPanelProps = any;

interface BotCreateFormProps {
    onClose: () => void;
}

const BotCreateForm: React.FC<BotCreateFormProps> = function(props) {
    return (
        <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create New Bot</DrawerHeader>

            <DrawerBody>
                <h1>FORM GOES HERE</h1>
            </DrawerBody>
        </DrawerContent>
    );
};

const BotControlPanel: React.FC<BotControlPanelProps> = function(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const buttonHandle = React.useRef();

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
                    <BotCreateForm onClose={onClose} />
                </DrawerOverlay>
            </Drawer>
        </div>
    );
};

export default BotControlPanel;
