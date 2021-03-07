import React from 'react';
import { BotCurrency } from '../types';
import { Divider } from "@chakra-ui/react";

type BotInstanceCardProps = any;
type CardInterfaceProps = any;

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

const CardInterface: React.FC<CardInterfaceProps> = function() {
    return (
        <div>hello there</div>
    );
};

export const BotInstanceCard: React.FC<BotInstanceCardProps> = function() {
    return (
        <div className="bot-card">
            <CardHeader name="My First Crypto Bot" currency={BotCurrency.BITCOIN} />
            <Divider orientation="horizontal" />
            <CardInterface>

            </CardInterface>
        </div>
    );
};
