/**
 * TODO: re-export library bundles here
 * 
 * The local link to each package is listed as an optional dependency.
 * It will, by default, try to build that local copy and import it.
 * If this fails, it will instead import the public package.
 */

import { TransformContext } from "@unca-acm/lib-transform-local";

let Context: TransformContext = null;

const getTransform = async function(): Promise<() => number> {
    if (Context === null) {
        Context = new TransformContext('/bin');
    }
    return (await Context.HelloModule()).sayHello;
};

export {
    getTransform,
};