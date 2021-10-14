"use strict";
exports.__esModule = true;
exports.toCurrency = void 0;
var getGroupToCurrency = function (group) {
    // necessary arrays needed to convert from numbers to currency
    var basics = [
        'cero',
        'un',
        'dos',
        'tres',
        'cuatro',
        'cinco',
        'seis',
        'siete',
        'ocho',
        'nueve',
        'diez',
        'once',
        'doce',
        'trece',
        'catorce',
        'quince',
    ];
    var teens = [
        '',
        'dieci',
        'veinti',
        'treinta',
        'cuarenta',
        'cincuenta',
        'sesenta',
        'setenta',
        'ochenta',
        'noventa',
    ];
    var hundreds = [
        '',
        'ciento',
        'doscientos',
        'trescientos',
        'cuatrocientos',
        'quinientos',
        'seiscientos',
        'setecientos',
        'ochocientos',
        'novecientos',
    ];
    // variable used to temporarly store currency
    var toCurrency = '';
    // handle hundreds
    if (group.length === 3) {
        switch (parseInt(group, 10)) {
            case 100:
                return 'cien ';
            case 0:
                return '';
            default:
                toCurrency += hundreds[parseInt(group[0], 10)] + " ";
        }
        // eslint-disable-next-line
        group = group.substring(1, 3);
    }
    // handle teens and 'basic' numbers
    if (parseInt(group, 10) <= 15) {
        // if group is less than 15, select from basics array
        if (group === '00') {
            return toCurrency;
        }
        toCurrency += basics[parseInt(group, 10)] + " ";
    }
    else {
        // else look for the number in both teens and basics arrays
        var zeroAtTheEnd = group[1] === '0';
        switch (parseInt(group, 10)) {
            case 20:
                return toCurrency + "veinte ";
            default:
                toCurrency += teens[parseInt(group[0], 10)] +
                    (parseInt(group[0], 10) >= 3 && !zeroAtTheEnd ? ' y ' : '') +
                    (zeroAtTheEnd ? '' : basics[parseInt(group[1], 10)]) + " ";
        }
    }
    // return result
    return toCurrency;
};
var toCurrency = function (num, moneda) {
    return new Promise(function (resolve, reject) {
        // number to string
        var number = num.toFixed(2);
        // separate decimals (only 2) and integers
        var integers = number.substring(0, number.indexOf('.'));
        var decimals = number.substring(number.indexOf('.') + 1, number.length);
        var monedaName = !moneda || moneda === 'MXN' ? 'M.N.' : moneda;
        // intitalize string to store currency
        var numberToCurrency = '';
        // some helpful variables
        var noThouhsands = false;
        var noHundreds = false;
        var thousandsOfMillions = false;
        // Maximum supported number is 999,999,999,999.99
        if (integers.length <= 12) {
            // evaluate each group of 3 digitis (hundreds, thousands, millions, thousans of millions)
            // evaluate thousands of millions
            if (integers.length === 12 || integers.length === 11 || integers.length === 10) {
                var group = integers.substring(0, integers.length - 9);
                thousandsOfMillions = true;
                switch (parseInt(group, 10)) {
                    case 0:
                        break;
                    case 1:
                        numberToCurrency += 'mil ';
                        break;
                    default:
                        numberToCurrency += getGroupToCurrency(group) + "mil ";
                }
                integers = integers.substring(integers.length - 9, integers.length);
            }
            // evaluate millions
            if (integers.length === 9 || integers.length === 8 || integers.length === 7) {
                var group = integers.substring(0, integers.length - 6);
                numberToCurrency += getGroupToCurrency(group);
                if (!thousandsOfMillions && parseInt(group, 10) === 1) {
                    numberToCurrency += 'millon ';
                }
                else {
                    numberToCurrency += 'millones ';
                }
                integers = integers.substring(integers.length - 6, integers.length);
            }
            // evaluate thousands
            if (integers.length === 6 || integers.length === 5 || integers.length === 4) {
                var group = integers.substring(0, integers.length - 3);
                noThouhsands = parseInt(group, 10) === 0;
                switch (parseInt(group, 10)) {
                    case 0:
                        break;
                    case 1:
                        numberToCurrency += 'mil ';
                        break;
                    default:
                        numberToCurrency += getGroupToCurrency(group) + "mil ";
                }
                integers = integers.substring(integers.length - 3, integers.length);
            }
            // evaluate hundreds
            noHundreds = parseInt(integers, 10) === 0;
            numberToCurrency += getGroupToCurrency(integers);
            numberToCurrency += (noThouhsands && noHundreds ? 'de ' : '') + (numberToCurrency === 'un ' ? 'peso ' : 'pesos ') + decimals + "/100 " + monedaName;
            resolve(numberToCurrency.toUpperCase());
        }
        reject('Error: el número es demasiado grande.');
    });
};
exports.toCurrency = toCurrency;
//# sourceMappingURL=toCurrency.js.map