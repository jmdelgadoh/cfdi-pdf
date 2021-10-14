"use strict";
exports.__esModule = true;
exports.dataToCfdi = exports.Cfdi = exports.Emisor = exports.Receptor = exports.Concepto = exports.CfdiRelacionado = exports.TimbreFiscalDigital = exports.ComplementoPago = exports.DoctoRelacionado = exports.Traslado = exports.Retencion = void 0;
var check_1 = require("../utils/check");
var Retencion = /** @class */ (function () {
    function Retencion() {
    }
    return Retencion;
}());
exports.Retencion = Retencion;
var Traslado = /** @class */ (function () {
    function Traslado() {
    }
    return Traslado;
}());
exports.Traslado = Traslado;
var DoctoRelacionado = /** @class */ (function () {
    function DoctoRelacionado() {
    }
    return DoctoRelacionado;
}());
exports.DoctoRelacionado = DoctoRelacionado;
var ComplementoPago = /** @class */ (function () {
    function ComplementoPago() {
    }
    return ComplementoPago;
}());
exports.ComplementoPago = ComplementoPago;
var TimbreFiscalDigital = /** @class */ (function () {
    function TimbreFiscalDigital() {
    }
    return TimbreFiscalDigital;
}());
exports.TimbreFiscalDigital = TimbreFiscalDigital;
var CfdiRelacionado = /** @class */ (function () {
    function CfdiRelacionado() {
    }
    return CfdiRelacionado;
}());
exports.CfdiRelacionado = CfdiRelacionado;
var Concepto = /** @class */ (function () {
    function Concepto() {
    }
    return Concepto;
}());
exports.Concepto = Concepto;
var Receptor = /** @class */ (function () {
    function Receptor() {
    }
    return Receptor;
}());
exports.Receptor = Receptor;
var Emisor = /** @class */ (function () {
    function Emisor() {
    }
    return Emisor;
}());
exports.Emisor = Emisor;
var Cfdi = /** @class */ (function () {
    function Cfdi() {
    }
    return Cfdi;
}());
exports.Cfdi = Cfdi;
/**
 *
 * @param {object} xmlData
 */
var dataToCfdi = function (xmlData) {
    return new Promise(function (resolve, reject) {
        var obj = new Cfdi();
        try {
            var comprobante = xmlData['cfdi:Comprobante'];
            // obtener datos generales
            obj.version = (0, check_1.exists)(comprobante.$.Version);
            obj.serie = (0, check_1.exists)(comprobante.$.Serie);
            obj.folio = (0, check_1.exists)(comprobante.$.Folio);
            obj.fecha = (0, check_1.exists)(comprobante.$.Fecha);
            obj.noCertificado = (0, check_1.exists)(comprobante.$.NoCertificado);
            obj.lugar = (0, check_1.exists)(comprobante.$.LugarExpedicion);
            obj.tipoDeComprobante = (0, check_1.exists)(comprobante.$.TipoDeComprobante);
            obj.moneda = (0, check_1.exists)(comprobante.$.Moneda);
            obj.formaPago = (0, check_1.exists)(comprobante.$.FormaPago);
            obj.tipoCambio = (0, check_1.exists)(comprobante.$.TipoCambio);
            obj.metodoPago = (0, check_1.exists)(comprobante.$.MetodoPago);
            obj.condicionesDePago = (0, check_1.exists)(comprobante.$.CondicionesDePago);
            obj.confirmacion = (0, check_1.exists)(comprobante.$.Confirmacion);
            // initializar el objeto emisor
            obj.emisor = new Emisor();
            // obtner emisor del comprobante
            var comprobanteEmisor = comprobante['cfdi:Emisor'];
            if (comprobanteEmisor) {
                // generar objeto emisor
                obj.emisor.rfc = (0, check_1.exists)(comprobanteEmisor[0].$.Rfc);
                obj.emisor.nombre = (0, check_1.exists)(comprobanteEmisor[0].$.Nombre);
                obj.emisor.regimenFiscal = (0, check_1.exists)(comprobanteEmisor[0].$.RegimenFiscal);
            }
            // inicializar objeto receptor
            obj.receptor = new Receptor();
            // obtener receptor del comprobante
            var comprobanteReceptor = comprobante['cfdi:Receptor'];
            if (comprobanteReceptor) {
                // generar objeto receptor
                obj.receptor.rfc = (0, check_1.exists)(comprobanteReceptor[0].$.Rfc);
                obj.receptor.nombre = (0, check_1.exists)(comprobanteReceptor[0].$.Nombre);
                obj.receptor.residenciaFiscal = (0, check_1.exists)(comprobanteReceptor[0].$.ResidenciaFiscal);
                obj.receptor.numRegIdTrib = (0, check_1.exists)(comprobanteReceptor[0].$.NumRegIdTrib);
                obj.receptor.usoCFDI = (0, check_1.exists)(comprobanteReceptor[0].$.UsoCFDI);
            }
            // inicializar arreglo de conceptos
            obj.conceptos = [];
            // obtener conceptos del comprobante
            var comprobanteConceptos = comprobante['cfdi:Conceptos'];
            if (comprobanteConceptos) {
                var comprobanteConcepto = comprobanteConceptos[0]['cfdi:Concepto'];
                if (comprobanteConcepto) {
                    obj.conceptos = comprobanteConcepto.map(function (concepto) {
                        var trasladosArr = [];
                        var retencionesArr = [];
                        var impuestos = concepto['cfdi:Impuestos'];
                        if (impuestos) {
                            var traslados = impuestos[0]['cfdi:Traslados'];
                            var retenciones = impuestos[0]['cfdi:Retenciones'];
                            if (traslados) {
                                var traslado = traslados[0]['cfdi:Traslado'];
                                trasladosArr = traslado.map(function (elem) {
                                    return {
                                        impuesto: elem.$.Impuesto,
                                        tipoFactor: elem.$.TipoFactor,
                                        tasaOCuota: elem.$.TasaOCuota,
                                        importe: elem.$.Importe
                                    };
                                });
                            }
                            if (retenciones) {
                                var retencion = retenciones[0]['cfdi:Retencion'];
                                retencionesArr = retencion.map(function (elem) {
                                    return {
                                        impuesto: elem.$.Impuesto,
                                        tipoFactor: elem.$.TipoFactor,
                                        tasaOCuota: elem.$.TasaOCuota,
                                        importe: elem.$.Importe
                                    };
                                });
                            }
                        }
                        return {
                            clave: (0, check_1.exists)(concepto.$.ClaveProdServ),
                            noIdentificacion: (0, check_1.exists)(concepto.$.NoIdentificacion),
                            cantidad: (0, check_1.existsValue)(concepto.$.Cantidad),
                            valorUnitario: (0, check_1.existsValue)(concepto.$.ValorUnitario),
                            claveUnidad: (0, check_1.exists)(concepto.$.ClaveUnidad),
                            unidad: (0, check_1.exists)(concepto.$.Unidad),
                            importe: (0, check_1.existsValue)(concepto.$.Importe),
                            descripcion: (0, check_1.exists)(concepto.$.Descripcion),
                            descuento: (0, check_1.existsValue)(concepto.$.Descuento),
                            traslados: trasladosArr,
                            retenciones: retencionesArr
                        };
                    });
                }
            }
            // obtener cfdiRelacionado del comprobante
            var comprobanteCfdiRelacionados = comprobante['cfdi:CfdiRelacionados'];
            if (comprobanteCfdiRelacionados) {
                var comprobanteCfdiRelacionado = comprobanteCfdiRelacionados[0]['cfdi:CfdiRelacionado'];
                if (comprobanteCfdiRelacionado) {
                    // inicializar objeto cfdiRelacionado
                    obj.cfdiRelacionado = new CfdiRelacionado();
                    // generar objeto CfdiRelacionado
                    obj.cfdiRelacionado.tipoRelacion = (0, check_1.exists)(comprobanteCfdiRelacionados[0].$.TipoRelacion);
                    obj.cfdiRelacionado.uuid = (0, check_1.exists)(comprobanteCfdiRelacionado[0].$.UUID);
                }
            }
            // obtener complemento del comprobante
            var comprobanteComplemento = comprobante['cfdi:Complemento'];
            if (comprobanteComplemento) {
                // obtener el timbre fiscal digital del comprobante
                var comprobanteTimbreFiscalDigital = comprobanteComplemento[0]['tfd:TimbreFiscalDigital'];
                if (comprobanteTimbreFiscalDigital) {
                    // inicializar objeto timbreFiscalDigital
                    obj.timbreFiscalDigital = new TimbreFiscalDigital();
                    // generar objecto timbreFiscalDigital
                    obj.timbreFiscalDigital.uuid = (0, check_1.exists)(comprobanteTimbreFiscalDigital[0].$.UUID);
                    obj.timbreFiscalDigital.fechaTimbrado = (0, check_1.exists)(comprobanteTimbreFiscalDigital[0].$.FechaTimbrado);
                    obj.timbreFiscalDigital.selloSAT = (0, check_1.exists)(comprobanteTimbreFiscalDigital[0].$.SelloSAT);
                    obj.timbreFiscalDigital.selloCFD = (0, check_1.exists)(comprobanteTimbreFiscalDigital[0].$.SelloCFD);
                    obj.timbreFiscalDigital.noCertificadoSAT = (0, check_1.exists)(comprobanteTimbreFiscalDigital[0].$.NoCertificadoSAT);
                    obj.timbreFiscalDigital.version = (0, check_1.exists)(comprobanteTimbreFiscalDigital[0].$.Version);
                }
                // inizializar arreglo de pagos
                obj.pagos = [];
                // obtener pagos
                var comprobantePagos = comprobanteComplemento[0]['pago10:Pagos'];
                if (comprobantePagos) {
                    var comprobantePago = comprobantePagos[0]['pago10:Pago'];
                    if (comprobantePago) {
                        obj.pagos = comprobantePago.map(function (pago) {
                            var doctoRelacionado = pago['pago10:DoctoRelacionado'];
                            var pagoObj = new ComplementoPago();
                            pagoObj.fecha = pago.$.FechaPago;
                            pagoObj.formaPago = pago.$.FormaDePagoP;
                            pagoObj.moneda = pago.$.MonedaP;
                            pagoObj.tipoCambio = (0, check_1.exists)(pago.$.TipoCambioP);
                            pagoObj.monto = pago.$.Monto;
                            pagoObj.doctoRelacionados = [];
                            if (doctoRelacionado) {
                                pagoObj.doctoRelacionados = doctoRelacionado.map(function (doc) { return ({
                                    uuid: doc.$.IdDocumento,
                                    moneda: doc.$.MonedaDR,
                                    tipoCambio: (0, check_1.exists)(doc.$.TipoCambioDR),
                                    metodoPago: doc.$.MetodoDePagoDR,
                                    numParcialidad: doc.$.NumParcialidad,
                                    saldoAnterior: doc.$.ImpSaldoAnt,
                                    importePagado: doc.$.ImpPagado,
                                    saldoInsoluto: doc.$.ImpSaldoInsoluto
                                }); });
                            }
                            return pagoObj;
                        });
                    }
                }
            }
            // obtener subtotal
            obj.subTotal = (0, check_1.existsValue)(comprobante.$.SubTotal);
            // obtener descuento
            obj.descuento = (0, check_1.existsValue)(comprobante.$.Descuento);
            // obtener total
            obj.total = (0, check_1.existsValue)(comprobante.$.Total);
            // inizializar arreglos de Impuestos
            obj.traslados = [];
            obj.retenciones = [];
            // obtener impuestos del comprobante
            var comprobanteImpuestos = comprobante['cfdi:Impuestos'];
            if (comprobanteImpuestos) {
                var traslados = comprobanteImpuestos[0]['cfdi:Traslados'];
                var retenciones = comprobanteImpuestos[0]['cfdi:Retenciones'];
                if (traslados) {
                    var traslado = traslados[0]['cfdi:Traslado'];
                    obj.traslados = traslado.map(function (elem) {
                        return {
                            impuesto: elem.$.Impuesto,
                            tipoFactor: elem.$.TipoFactor,
                            tasaOCuota: elem.$.TasaOCuota,
                            importe: elem.$.Importe
                        };
                    });
                }
                if (retenciones) {
                    var retencion = retenciones[0]['cfdi:Retencion'];
                    obj.retenciones = retencion.map(function (elem) {
                        return {
                            impuesto: elem.$.Impuesto,
                            tipoFactor: elem.$.TipoFactor,
                            tasaOCuota: elem.$.TasaOCuota,
                            importe: elem.$.Importe
                        };
                    });
                }
                obj.totalImpuestosRetenidos = (0, check_1.existsValue)(comprobanteImpuestos[0].$.TotalImpuestosRetenidos);
                obj.totalImpuestosTrasladados = (0, check_1.existsValue)(comprobanteImpuestos[0].$.TotalImpuestosTrasladados);
            }
            resolve(obj);
        }
        catch (e) {
            reject('CFDI no valido');
        }
    });
};
exports.dataToCfdi = dataToCfdi;
//# sourceMappingURL=dataToCfdi.js.map