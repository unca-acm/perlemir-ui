import React from 'react';
import * as Data from './types';

const DataContext: React.Context<Data.StorageContext> = React.createContext({
    dataBlock: null,
    query: (target: Data.BaseData) => null,
    transform: (target: Data.BaseData) => null,
});

const parseCoinbaseResponse = async function(apiResponse: Response): Promise<Data.BaseData> {
    try {
        const { prices } = (await apiResponse.json()).data;
        const data = new Float32Array(prices.length);
        for (const [index, priceEntry] of prices.entries()) {
            data[index] = parseFloat(priceEntry.price);
        }
        return data;
    }
    catch (err) {
        console.error("Something went wrong: ", err);
        return new Float32Array(0);
    }
};

/* DATA STORE */
export const DataStore: Data.Storage = function(props) {
    const [ priceData, setPriceData ] = React.useState<Data.DataBlockIndex>({
        "historical": null,
    });

    React.useEffect(function() {
        fetch(`https://api.coinbase.com/v2/prices/BTC-USD/historic?days=30`)
            .then(res => parseCoinbaseResponse(res))
            .then(data => setPriceData({
                historical: {
                    data
                }
            }));
    }, []);

    return (
        <DataContext.Provider value={{ dataBlock: priceData, query: null, transform: null }}>
            {props.children}
        </DataContext.Provider>
    );
};

export const DataView = DataContext.Consumer;
