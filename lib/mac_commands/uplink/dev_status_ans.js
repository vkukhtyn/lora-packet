'use strict';

var cid = require('../cid.js');

class DeviceStatusAns {
    constructor(buffer) {
        if (buffer[0] != cid.uplinkMacCommands().DEV_STATUS_ANS.cid) {
            throw new Error(`DeviceStatusAns requires CID [${cid.uplinkMacCommands().DEV_STATUS_ANS.cid}] but [${buffer[0]}] received`);
        }
        if ((buffer.length - 1) != cid.uplinkMacCommands().DEV_STATUS_ANS.size) {
            throw new Error(`DeviceStatusAns size should be [${cid.uplinkMacCommands().DEV_STATUS_ANS.size}]`);
        }
        this.buffer = buffer;
    };

    getCid() {
        return this.buffer[0];
    };

    getBattery() {

    };

    getMargin() {

    };
}

module.exports = DeviceStatusAns;
