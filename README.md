# UNCA-ACM Algo Trading Bot: Web App

Web app for the user-level dashboard and application.

Wraps around the bot's API and configuration to provide a simple, out-of-the-box experience using the bot.

### Layout

The code base is split into two parts: the server and the client.

This project uses TypeScript + React to power the front end, and TypeScript + Express.js for the back end. Additionally, for the front end, it is "bundled" using Snowpack to ensure high performance and a better user experience with a lightweight bundler.

#### Client

Source code for the client can be found under `view`.

The source code is written using React+TypeScript and must be compiled. This is performed automatically using Snowpack.

The output of Snowpack can be found under `public`. The generated files are actually completey static, and can be accessed (minus server API functionality) via the entry point at `public/index.html`.

#### Server

Source code for the server can be found under `src`.

The source code is written in TypeScript and must be compiled. The emitted JS code will be placed in the `dist` folder, and the entry-point can be found at `dist/app.js`.

The server provides the Client by simply mapping the root of the webpage, `/`, to the static files generated from Snowpack. The rest of the site's functionality (mostly the management API provided by the server) is mapped to `/api`.


### Development

This is currently just a skeleton of a project; a more advanced build toolchain will be involved, and this Readme and documentation will be updated to reflect this.

#### Installation

Make sure the following tools are installed:

1. Node.js v14.0+

2. NPM

For working with the WebAssembly libraries, additionally install:

1. GNU Make

2. Clang+LLVM

3. WebAssembly Binary Toolkit (WABT)

#### Running

1. `npm start` to start the local dev server

2. `npm start:ui` to start the front end, without running the server

3. `npm build` to create a production build for both client and server

4. Open to `http://localhost:8000`