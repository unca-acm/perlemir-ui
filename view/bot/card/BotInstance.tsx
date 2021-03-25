import React from 'react';
import { BotCurrency, BotInstance, BotStatus } from '../types';
import {Box, Button, Divider} from "@chakra-ui/react";

import "../bot-styles.css";

interface BotInstanceCardProps {
    name: string;
    instance: BotInstance;
    dispatch: (updated: Partial<BotInstance>) => void;
}

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

export const BotInstanceCard: React.FC<BotInstanceCardProps> = function({ instance, dispatch, ...props}) {
    return (
        <Box className="bot-card" bg="perlemirBrand.200">
            <CardHeader name={instance.name} currency={instance.currency} />
            <Divider orientation="horizontal" />
            <div className="bot-card-interface-group">
                <div className="bot-card-interface align-left">
                    <StatusButton
                        status={instance.status}
                        onSelect={status => dispatch({ status })}>
                        {[
                            "Running",
                            "Paused",
                            "Stopped",
                        ][instance.status]}
                    </StatusButton>
                </div>
                <div className="bot-card-interface align-right">
                    <h1>{props.name}</h1>
                </div>
            </div>

            <div className={"bot-card-interface-group"}>
                {props.children}
            </div>
        </Box>
    );
};

export const withInstanceCard = function<T>(
    BotControls: React.FC<T>, botTypeName: string): React.FC<T & BotInstanceCardProps> {

    return function(props) {
        return (
            <BotInstanceCard instance={props.instance} dispatch={props.dispatch} name={botTypeName}>
                <BotControls {...props} />
            </BotInstanceCard>
        )
    }
}