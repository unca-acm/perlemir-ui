/* *******************************
 * *** APPLICATION ENTRY POINT ***
 * *******************************
 * 
 * The server's process starts here!
 */

import path from 'path';
import express from 'express';
import * as snowpack from 'snowpack';

import CONFIG from './appconfig.json';

interface AppConfig {
    port: number;
    build: boolean;
}

/**
 * Validate the environment key provided by the user.
 * Launches into development env by default, or if not valid.
 */
const cfg: AppConfig = (function(envStr: string = 'dev'): AppConfig {
    if (!Object.keys(CONFIG).includes(envStr)) {
        console.error(`WARNING: ${envStr} is not a valid entry for APP_ENVIRONMENT`);
        envStr = 'dev';
    }
    else {
        return CONFIG[envStr];
    }
})(process.env['APP_ENVIRONMENT']?.toLowerCase());


void async function Main() {

    const app = express();

    if (!cfg.build) {
        // Manually build the snowpack files (views, static assets, etc)
        // In production, this step is intended to be executed prior to running
        await snowpack.build({
            config: await snowpack.loadConfiguration(
                // Overrides for the configuration file go in this object
                {},
                path.resolve('snowpack.config.js')
            ),
            lockfile: null
        });
    }
    else {
        console.log("PING");
    }

    app.use('/', express.static('public'));

    app.listen(cfg.port, function() {
        console.log(`Listening on port ${cfg.port}`);
    });
}();