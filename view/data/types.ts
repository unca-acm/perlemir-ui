import React from 'react';
/**
 * Data types for the data framework.
 */

// Array representing "under-the-hood" data.
export type BaseData = Float32Array | Int32Array | number[];
type DataBlockTitle = "historical";

// Data Store context types
interface StoragePropDefinitions {
    // TODO
    instance?: WebAssembly.Instance;
}
export type StorageProps = React.PropsWithChildren<StoragePropDefinitions>
export type Storage = React.FC<StorageProps>;
export interface DataBlock {
    data: BaseData;
    domain?: Int32Array;
}
export type DataBlockIndex = { [ title in DataBlockTitle ]: DataBlock };
export interface StorageContext {
    dataBlock: DataBlockIndex;
    query: (target: BaseData) => { [q: string]: () => void }
    transform: (target: BaseData) => { [t: string]: () => void }
}