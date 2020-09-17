exports.downlinkMacCommands = function() {
    return {
        LINK_CHECK_ANS: createCid(0x02, 'LinkCheckAns', 2),
        DEV_STATUS_REQ: createCid(0x06, 'DevStatusReq', 0)
    };
}

exports.uplinkMacCommands = function() {
    return {
        LINK_CHECK_REQ: createCid(0x02, 'LinkCheckReq', 0),
        DEV_STATUS_ANS: createCid(0x06, 'DevStatusAns', 2)
    };
}

function createCid(cid, name, size) {
    return {
        cid: cid,
        name: name,
        size: size
    };
}
