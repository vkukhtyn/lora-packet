'use strict';

let lora_packet = require('../lib/index.js');
let expect = require("chai").expect;
let assert = require('chai').assert;

module.exports = function () {
    describe('parse MAC commands in downlink', function () {
        let downlinkMacCommands = lora_packet.downlinkMacCommands();

        it('should parse LinkCheckAns', function () {

        });
        it('should parse DevStatusReq', function () {
            let message_hex = '60A5F59B0F810B0006505154DC';
            let packet = lora_packet.fromWire(new Buffer(message_hex, 'hex'));
            expect(packet).to.not.be.undefined;
            expect(packet.getDir()).to.equal('down');
            expect(packet.getBuffers().FOpts[0]).to.deep.equal(downlinkMacCommands.DEV_STATUS_REQ.cid);
            expect(packet.getBuffers().FOpts.length).to.equal(downlinkMacCommands.DEV_STATUS_REQ.size + 1);
        });
    });

    describe('parse MAC commands in uplink', function () {
        let uplinkMacCommands = lora_packet.uplinkMacCommands();

        it('should parse LinkCheckReq', function () {

        });
        it('should parse DevStatusAns', function () {
            let message_hex = "40A5F59B0F83DE0106FE0E29F3513B";
            let packet = lora_packet.fromWire(new Buffer(message_hex, 'hex'));
            expect(packet).to.not.be.undefined;
            expect(packet.getDir()).to.equal('up');
            expect(packet.getBuffers().FOpts[0]).to.deep.equal(uplinkMacCommands.DEV_STATUS_ANS.cid);
            expect(packet.getBuffers().FOpts.length).to.equal(uplinkMacCommands.DEV_STATUS_ANS.size + 1);
        });
    });

    describe('create MAC commands from byte array', function() {
        it('fail on DeviceStatusReq creation', function() {

        })
        it('fail on DeviceStatusAns creation', function() {
            expect(() => new lora_packet.DeviceStatusAns(new Buffer('00', 'hex'))).to.throw(Error, 'DeviceStatusAns requires CID [6] but [0] received');
            expect(() => new lora_packet.DeviceStatusAns(new Buffer('06010203', 'hex'))).to.throw(Error, 'DeviceStatusAns size should be [2]');
        })
    });
};
