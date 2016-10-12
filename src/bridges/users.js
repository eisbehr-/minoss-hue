"use strict";

/**
 * get users of a bridge
 * request parameters:
 * @param {string} bridge|b
 */

var hue = require("node-hue-api");
var hueBridge = require("../bridge");
var HueApi = hue.HueApi;
var formatter = require("../formatter");

module.exports = function(config, params, respond, error) {
    var bridge = hueBridge(config, params);

    // bridge not known
    if( !bridge ) {
        return error("no or unknown bridge specified");
    }

    var con = new HueApi(bridge.ip, bridge.username);

    con.getRegisteredUsers(function(err, users) {
        if( err ){
            return error(err.message);
        }

        respond({
            success: true, 
            users: formatter.propertyNames(users, params.output)
        });
    });
};