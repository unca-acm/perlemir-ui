import React from 'react';
/**
 * Data types for the data framework.
 */

// Array representing "under-the-hood" data.
export type BaseData = Float32Array | number[];

// Data Store context types
interface StoragePropDefinitions {
    // TODO
    instance?: WebAssembly.Instance;
}
export type StorageProps = React.PropsWithChildren<StoragePropDefinitions>
export type Storage = React.FC<StorageProps>;

export interface StorageContext {
    data: BaseData | null;
    // TODO: modify query/transform type signatures once lib-transform is live
    query: (target: BaseData) => { [q: string]: () => void }
    transform: (target: BaseData) => { [t: string]: () => void }
}