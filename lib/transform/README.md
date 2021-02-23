# Perlimir Transform-Lib

Fast, efficient, and ultimately overkill library for performing analytical computations on a client's financial data. Written in C and compiled using WebAssembly, these run directly in the client's browser and allow for computationally expensive operations to be done locally.

Use this package to give users insights into the performance of their algo trading bot.

## Install & Use

### Installation

* To use the published package: `npm install --save @unca-acm/lib-transform@0.0.1`
* For local development, use `npm link`

Each transform tool has two parts: the WebAssembly binaries and the JS interface. For performance reasons, the `.wasm` binaries are not bundled in the output of the library; instead, you'll need to copy the contents of this library's `bin` folder in order to use them. Most major bundlers, such as Snowpack and Webpack, have options for copying/including assets.

NOTE: This library is heavily dependent on Promises and asynchronous methods, due to the nature of network data and (most importantly) the instantiation process WebAssembly uses. We encourage you to use Promises or, if desired, the ES7 `async/await` syntax.

#### Using an Interface

1. Import the selected interface builder from the library (listed under `JavaScript Interfaces` below).
2. Pass the binary blob data of the respective `.wasm` binaries into the `HelloTransformBuilder#compile` method. The `compile` method expects one argument: a Promise which resolves to an `ArrayBuffer` containing the binary.
3. Call `#instantiate()` to create a blank instance of the binary.
4. Use the methods exposed on the instantiated instance to interact with the transformer.

Below is an example using the `HelloTransform` instance, which is provided as a quick example to test your usage of the library.

```ts
import { HelloTransformBuilder } from "@unca-acm/lib-transform";

async function example() {
    // Make an instance of the builder
    const builder = new HelloTransformBuilder();

    // Compile and instantiate the transformer
    const bin = await fetch("/path/to/hello.wasm").then(bin => bin.ArrayBuffer());
    const lib = await builder.compile(bin);
    const transformer = await lib.instantiate();

    // Use the methods exposed by the transformer
    // For example, the HelloTransform has one exposed method: `HelloTransform#sayHello`
    const message = await transformer.sayHello();
    console.log(message); // Output:   "Hello, world!"
}
```

#### JavaScript Interfaces

To use an interface, supply the required `.wasm` binaries upon compilation.

Transformer    | Builder     | Interface | Binaries | Description
-------------- | ----------- | --------- | -------- | -----------
HelloTransform | `HelloTransformBuilder` | <ul><li>`sayHello`: Resolves to the string `Hello, world!` | `hello.wasm` |  Simply prints `Hello, world!`<br />Used to test library setup.
