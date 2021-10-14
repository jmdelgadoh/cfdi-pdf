"use strict";
exports.__esModule = true;
exports.prefixImage = exports.existsValue = exports.exists = void 0;
var exists = function (parameter) { return parameter || ''; };
exports.exists = exists;
var existsValue = function (parameter) { return parameter || '0'; };
exports.existsValue = existsValue;
var prefixImage = function (imageStringBase64) {
    if (!imageStringBase64)
        return null;
    var prefix = 'data:image/jpeg;base64,';
    if (imageStringBase64.startsWith(prefix))
        return imageStringBase64;
    else
        return "" + prefix + imageStringBase64;
};
exports.prefixImage = prefixImage;
//# sourceMappingURL=check.js.map