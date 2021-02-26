import React from 'react';
/**
 * Data types for the data framework.
 */

// Array representing "under-the-hood" data.
export type BaseData = Float32Array | Int32Array | number[];
type DataBlockTitle = "historical";

// Data Store context types
interface StoragePropDefinitions {
    instance?: WebAssembly.Instance;
}
export type StorageProps = React.PropsWithChildren<StoragePropDefinitions>
export type Storage = React.FC<StorageProps>;

/* DataBlock: represents a collection of all "raw" data for a given purpose.
 * Domain can be stored as a separate variable in cases where it's necessary,
 *   but not necessary for the underlying computations.
 * TODO: add other important properties, maybe available queries/transforms?
 */
export interface DataBlock {
    data: BaseData;
    domain?: Int32Array;
}

/* Storage containing indexable blocks for different purposes.
 * For example, you may have a different block for the price graph and candlestick data.
 */
export type DataBlockIndex = { [ title in DataBlockTitle ]: DataBlock };

/* Properties held by the DataStore context API. */
export interface StorageContext {
    dataBlock: DataBlockIndex;
    query: (target: BaseData) => { [q: string]: () => void }
    transform: (target: BaseData) => { [t: string]: () => void }
}