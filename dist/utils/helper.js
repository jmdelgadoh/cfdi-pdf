"use strict";
exports.__esModule = true;
exports.breakEveryNCharacters = exports.formatCurrency = void 0;
var formatCurrency = function (currency) {
    return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'symbol' }).format(Number(currency));
};
exports.formatCurrency = formatCurrency;
var breakEveryNCharacters = function (str, n) {
    if (str === void 0) { str = ''; }
    if (n === void 0) { n = 86; }
    var arr = str.match(new RegExp(".{1," + n + "}", 'g'));
    var result = str;
    if (arr) {
        result = arr.reduce(function (a, b) {
            var check = b.substr(0, Math.floor(n / 3));
            if (a.length + b.length < n || check.includes('+') || check.includes('|')) {
                return "" + a + b;
            }
            return a + "\n" + b;
        });
    }
    return result;
};
exports.breakEveryNCharacters = breakEveryNCharacters;
//# sourceMappingURL=helper.js.map