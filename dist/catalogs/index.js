"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.usosCfdiCatalog = exports.tiposRelacionesCatalog = exports.tiposComprobantesCatalog = exports.regimenesFiscalesCatalog = exports.monedasCatalog = exports.metodosPagoCatalog = exports.impuestosCatalog = exports.formasPagoCatalog = exports.clavesUnidadesCatalog = void 0;
var cfdi_claves_unidades_json_1 = __importDefault(require("./cfdi_claves_unidades.json"));
var cfdi_formas_pago_json_1 = __importDefault(require("./cfdi_formas_pago.json"));
var cfdi_impuestos_json_1 = __importDefault(require("./cfdi_impuestos.json"));
var cfdi_metodos_pago_json_1 = __importDefault(require("./cfdi_metodos_pago.json"));
var cfdi_monedas_json_1 = __importDefault(require("./cfdi_monedas.json"));
var cfdi_regimenes_fiscales_json_1 = __importDefault(require("./cfdi_regimenes_fiscales.json"));
var cfdi_tipos_comprobantes_json_1 = __importDefault(require("./cfdi_tipos_comprobantes.json"));
var cfdi_tipos_relaciones_json_1 = __importDefault(require("./cfdi_tipos_relaciones.json"));
var cfdi_usos_cfdi_json_1 = __importDefault(require("./cfdi_usos_cfdi.json"));
var clavesUnidadesCatalog = Object.assign.apply(Object, __spreadArray([{}], cfdi_claves_unidades_json_1["default"].map(function (item) {
    var _a;
    return (_a = {}, _a[item.id] = item.texto, _a);
}), false));
exports.clavesUnidadesCatalog = clavesUnidadesCatalog;
var formasPagoCatalog = Object.assign.apply(Object, __spreadArray([{}], cfdi_formas_pago_json_1["default"].map(function (item) {
    var _a;
    return (_a = {}, _a[item.id] = item.texto, _a);
}), false));
exports.formasPagoCatalog = formasPagoCatalog;
var impuestosCatalog = Object.assign.apply(Object, __spreadArray([{}], cfdi_impuestos_json_1["default"].map(function (item) {
    var _a;
    return (_a = {}, _a[item.id] = item.texto, _a);
}), false));
exports.impuestosCatalog = impuestosCatalog;
var metodosPagoCatalog = Object.assign.apply(Object, __spreadArray([{}], cfdi_metodos_pago_json_1["default"].map(function (item) {
    var _a;
    return (_a = {}, _a[item.id] = item.texto, _a);
}), false));
exports.metodosPagoCatalog = metodosPagoCatalog;
var monedasCatalog = Object.assign.apply(Object, __spreadArray([{}], cfdi_monedas_json_1["default"].map(function (item) {
    var _a;
    return (_a = {}, _a[item.id] = item.texto, _a);
}), false));
exports.monedasCatalog = monedasCatalog;
var regimenesFiscalesCatalog = Object.assign.apply(Object, __spreadArray([{}], cfdi_regimenes_fiscales_json_1["default"].map(function (item) {
    var _a;
    return (_a = {}, _a[item.id] = item.texto, _a);
}), false));
exports.regimenesFiscalesCatalog = regimenesFiscalesCatalog;
var tiposComprobantesCatalog = Object.assign.apply(Object, __spreadArray([{}], cfdi_tipos_comprobantes_json_1["default"].map(function (item) {
    var _a;
    return (_a = {}, _a[item.id] = item.texto, _a);
}), false));
exports.tiposComprobantesCatalog = tiposComprobantesCatalog;
var tiposRelacionesCatalog = Object.assign.apply(Object, __spreadArray([{}], cfdi_tipos_relaciones_json_1["default"].map(function (item) {
    var _a;
    return (_a = {}, _a[item.id] = item.texto, _a);
}), false));
exports.tiposRelacionesCatalog = tiposRelacionesCatalog;
var usosCfdiCatalog = Object.assign.apply(Object, __spreadArray([{}], cfdi_usos_cfdi_json_1["default"].map(function (item) {
    var _a;
    return (_a = {}, _a[item.id] = item.texto, _a);
}), false));
exports.usosCfdiCatalog = usosCfdiCatalog;
//# sourceMappingURL=index.js.map