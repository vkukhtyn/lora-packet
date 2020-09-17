'use strict';

var mic = require('./mic.js');
var crypt = require('./crypt.js');
var packet = require('./packet.js');
var util = require('./util.js')("");
var mac_commands = require('./mac_commands/cid.js');

module.exports={
    downlinkMacCommands:mac_commands.downlinkMacCommands,
    uplinkMacCommands:mac_commands.uplinkMacCommands,

    fromWire:packet.fromWire,
    fromFields:_constructPacketFromFields,

    verifyMIC:mic.verifyMIC,
    calculateMIC:mic.calculateMIC,
    recalculateMIC:mic.recalculateMIC,

    decrypt:crypt.decrypt,
    decryptJoin:crypt.decryptJoin,
	decryptJoinAccept:crypt.decryptJoinAccept,

    constants:packet.constants,

    // deprecated
    getMIC:mic.calculateMIC,
    create:packet.fromWire,

    generateSessionKeys:crypt.generateSessionKeys
};


// to create a packet from fields, it's necessary to pull together
//  all three modules (packet.js, mic.js, crypt.js)
function _constructPacketFromFields(userFields, AppSKey, NwkSKey, AppKey, FCntMSBytes) {
	var FCntMSBytes = typeof FCntMSBytes !== 'undefined' ? FCntMSBytes : 0;

    // if user fails to supply keys, construct a packet anyway
    var constructed = packet.fromFields(userFields);

    if (constructed != null) {
        if(constructed.isDataMessage() == true) {
            // to encrypt, need NwkSKey if port=0, else AppSKey
            if ((constructed.getFPort() == 0 && util.isBufferLength(NwkSKey, 16))
                || (constructed.getFPort() > 0 && util.isBufferLength(AppSKey, 16))) {

                // crypto is reversible (just XORs FRMPayload), so we can
                //  just do "decrypt" on the plaintext to get ciphertext
                var ciphertext = crypt.decrypt(constructed, AppSKey, NwkSKey, FCntMSBytes);

                // overwrite payload with ciphertext
                constructed.getBuffers().FRMPayload = ciphertext;

                // recalculate buffers to be ready for MIC calc'n
                constructed.mergeGroupFields();

                if (util.isBufferLength(NwkSKey, 16)) {
                    mic.recalculateMIC(constructed, NwkSKey, AppKey, FCntMSBytes);
                    constructed.mergeGroupFields();
                }
            }
        } else if(constructed.isJoinRequestMessage() == true) {
            if (util.isBufferLength(AppKey, 16)) {
                mic.recalculateMIC(constructed, NwkSKey, AppKey, FCntMSBytes);
                constructed.mergeGroupFields();
            }
        } else if(constructed.isJoinAcceptMessage() == true) {
            if (util.isBufferLength(AppKey, 16)) {
                mic.recalculateMIC(constructed, NwkSKey, AppKey, FCntMSBytes);
                constructed.mergeGroupFields();

                var ciphertext = crypt.decryptJoin(constructed, AppKey);

                // overwrite payload with ciphertext
                ciphertext.copy(constructed.getBuffers().MACPayloadWithMIC);
            }
        }
    }
    return constructed;
}
