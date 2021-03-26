// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

const copy = require('rollup-plugin-copy');

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
        view: '/',
    },
    plugins: [
        ['@snowpack/plugin-typescript', {'args': '--project tsconfig.view.json'}]
    ],
    packageOptions: {
        rollup: {
            context: "public",
            plugins: [
                copy({
                    targets: [
                        { src: 'node_modules/\@unca-acm/**/*.wasm', dest: 'public/bin' }
                    ]
                })
            ]
        }
    },
    devOptions: {
        open: 'none',
        port: 8000,
    },
    buildOptions: {
        out: 'public',
    },
};
