"use strict";
exports.__esModule = true;
exports.parseXml = void 0;
var xml2js_1 = require("xml2js");
var parseXml = function (xml) {
    return new Promise(function (resolve, reject) {
        xml = decodeURI(xml);
        (0, xml2js_1.parseString)(xml, function (err, res) {
            res ? resolve(res) : reject(err);
        });
    });
};
exports.parseXml = parseXml;
//# sourceMappingURL=xmlToData.js.map