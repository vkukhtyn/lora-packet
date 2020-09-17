'use strict';

var lora_packet = require('..');
var expect = require("chai").expect;
var assert = require('chai').assert;

module.exports = function () {
    describe('parse MAC commands in downlink', function () {
        var downlinkMacCommands = lora_packet.downlinkMacCommands();

        it('should parse LinkCheckAns', function () {

        });
        it('should parse DevStatusReq', function () {
            var message_hex = '60A5F59B0F810B0006505154DC';
            var packet = lora_packet.fromWire(new Buffer(message_hex, 'hex'));
            expect(packet).to.not.be.undefined;
            expect(packet.getDir()).to.equal('down');
            expect(packet.getBuffers().FOpts[0]).to.deep.equal(downlinkMacCommands.DEV_STATUS_REQ.cid);
            expect(packet.getBuffers().FOpts.length).to.equal(downlinkMacCommands.DEV_STATUS_REQ.size + 1);
        });
    });

    describe('parse MAC commands in uplink', function () {
        var uplinkMacCommands = lora_packet.uplinkMacCommands();

        it('should parse LinkCheckReq', function () {

        });
        it('should parse DevStatusAns', function () {
            var message_hex = "40A5F59B0F83DE0106FE0E29F3513B";
            var packet = lora_packet.fromWire(new Buffer(message_hex, 'hex'));
            expect(packet).to.not.be.undefined;
            expect(packet.getDir()).to.equal('up');
            expect(packet.getBuffers().FOpts[0]).to.deep.equal(uplinkMacCommands.DEV_STATUS_ANS.cid);
            expect(packet.getBuffers().FOpts.length).to.equal(uplinkMacCommands.DEV_STATUS_ANS.size + 1);
        });
    });
};
