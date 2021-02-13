import React from 'react';
import * as Data from './types';

const DataContext: React.Context<Data.StorageContext> = React.createContext({
    data: null,
    query: (target: Data.BaseData) => null,
    transform: (target: Data.BaseData) => null,
});

/* DATA STORE */
export const DataStore: Data.Storage = function(props) {
    // Create a set of random test data.
    const data = new Uint32Array(10);
    data.forEach((d, i) => data[i] = (Math.random() * 20 + 20) * i);

    return (
        <DataContext.Provider value={{ data, query: null, transform: null }}>
            {props.children}
        </DataContext.Provider>
    );
};

export const DataView = DataContext.Consumer;
