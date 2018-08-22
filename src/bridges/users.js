'use strict';

/**
 * get users of a bridge
 * request parameters:
 * @param {string} bridge|b
 */

let hue = require('node-hue-api');
let hueBridge = require('../bridge');
let HueApi = hue.HueApi;
let formatter = require('../formatter');

module.exports = (config, params, respond, error) => {
    let bridge = hueBridge(config, params);

    // bridge not known
    if (!bridge) {
        return error('no or unknown bridge specified');
    }

    let con = new HueApi(bridge.ip, bridge.username);

    con.getRegisteredUsers((err, users) => {
        if (err) {
            return error(err.message);
        }

        respond({
            success: true, 
            users: formatter.propertyNames(users, params.output)
        });
    });
};