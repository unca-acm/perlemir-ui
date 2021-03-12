import React from 'react';
import {BotCurrency, BotInstance, BotStatus} from '../types';
import {Box, Button, Divider} from "@chakra-ui/react";

type BotInstanceCardProps = BotInstance;

interface StatusButtonProps {
    status?: BotStatus;
    onSelect?: (selection: BotStatus) => void;
}

interface CardHeaderProps {
    name: string;
    currency: BotCurrency;
}

const CardHeader: React.FC<CardHeaderProps> = function(props) {
    return (
        <div className="bot-card-header">
            <div className="bot-card-header-id">
                <h1>{props.name}</h1>
            </div>
            <div className="bot-card-header-currency">{props.currency}-USD</div>
        </div>
    );
};

const StatusButton: React.FC<StatusButtonProps> = function(props) {
    const color = (() => {
        // Determine which color to use based on the given status
        switch (props.status) {
        case BotStatus.PAUSED:
            return "red";
        case BotStatus.RUNNING:
            return "perlemirAccent";
        case BotStatus.STOPPED:
            return "blue";
        default:
            return "white";
        }
    })();
    const toggleStatus = React.useCallback(function(previousStatus) {
        return previousStatus === BotStatus.PAUSED
            ? BotStatus.RUNNING
            : BotStatus.PAUSED;
    }, [ props.status ]);

    return (
        <Button size="sm" 
            colorScheme={color}
            onClick={() => props.onSelect(toggleStatus(props.status))}>
            {props.children}
        </Button>
    );
};

export const BotInstanceCard: React.FC<BotInstanceCardProps> = function(props) {
    return (
        <Box className="bot-card" bg="perlemirBrand.200">
            <CardHeader name={props.name} currency={props.currency} />
            <Divider orientation="horizontal" />
            <div className="bot-card-interface-group">
                <div className="bot-card-interface align-left">
                    <StatusButton
                        status={props.status}
                        onSelect={() => null}>
                        {[
                            "Running",
                            "Paused",
                            "Stopped",
                        ][props.status]}
                    </StatusButton>
                    <h1>Amount: $0</h1>
                    <h1>Every 2 weeks</h1>
                </div>
                <div className="bot-card-interface align-right">
                    <h1>ID: {props.id}</h1>
                </div>
            </div>
        </Box>
    );
};
