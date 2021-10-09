import { exists, existsValue } from '../utils/check';

export class Retencion {
    impuesto: string;
    tipoFactor: string;
    tasaOCuota: string;
    importe: string;
    base?: string;
}

export class Traslado {
    impuesto: string;
    tipoFactor: string;
    tasaOCuota: string;
    importe: string;
    base?: string;
}

export class DoctoRelacionado {
    uuid: string;
    moneda: string;
    tipoCambio: string;
    metodoPago: string;
    numParcialidad: string;
    saldoAnterior: string;
    importePagado: string;
    saldoInsoluto: string;
}

export class ComplementoPago {
    fecha: string;
    formaPago: string;
    moneda: string;
    tipoCambio: string;
    monto: string;
    doctoRelacionados: Array<DoctoRelacionado>;
}

export class TimbreFiscalDigital {
    uuid: string;
    fechaTimbrado: string;
    selloSAT: string;
    selloCFD: string;
    noCertificadoSAT: string;
    version: string;
}

export class CfdiRelacionado {
    tipoRelacion: string;
    uuid: string;
}

export class Concepto {
    clave: string;
    noIdentificacion: string;
    cantidad: string;
    valorUnitario: string;
    claveUnidad: string;
    unidad: string;
    importe: string;
    descripcion: string;
    descuento: string;
    traslados: Array<Traslado>;
    retenciones: Array<Retencion>;
}

export class Receptor {
    rfc: string;
    nombre: string;
    residenciaFiscal: string;
    numRegIdTrib: string;
    usoCFDI: string;
}

export class Emisor {
    rfc: string;
    nombre: string;
    regimenFiscal: string;
}

export class Cfdi {
    version: string;
    serie: string;
    folio: string;
    fecha: string;
    noCertificado: string;
    lugar: string;
    tipoDeComprobante: string;
    moneda: string;
    formaPago: string;
    tipoCambio: string;
    metodoPago: string;
    condicionesDePago: string;
    confirmacion: string;
    emisor: Emisor;
    receptor: Receptor;
    conceptos: Array<Concepto>;
    cfdiRelacionado: CfdiRelacionado;
    timbreFiscalDigital?: TimbreFiscalDigital;
    pagos?: Array<ComplementoPago>;
    subTotal: string;
    descuento: string;
    total: string;
    traslados: Array<Traslado>;
    retenciones: Array<Retencion>;
    totalImpuestosRetenidos?: string;
    totalImpuestosTrasladados?: string;
    cadenaOriginalCC?: string;
}

/**
 *
 * @param {object} xmlData
 */
export const dataToCfdi = (xmlData: any): Promise<Cfdi> => {

    return new Promise<Cfdi>((resolve, reject) => {
        const obj: Cfdi = new Cfdi();
        try {
            const comprobante = xmlData['cfdi:Comprobante'];
            // obtener datos generales
            obj.version = exists(comprobante.$.Version);
            obj.serie = exists(comprobante.$.Serie);
            obj.folio = exists(comprobante.$.Folio);
            obj.fecha = exists(comprobante.$.Fecha);
            obj.noCertificado = exists(comprobante.$.NoCertificado);
            obj.lugar = exists(comprobante.$.LugarExpedicion);
            obj.tipoDeComprobante = exists(comprobante.$.TipoDeComprobante);
            obj.moneda = exists(comprobante.$.Moneda);
            obj.formaPago = exists(comprobante.$.FormaPago);
            obj.tipoCambio = exists(comprobante.$.TipoCambio);
            obj.metodoPago = exists(comprobante.$.MetodoPago);
            obj.condicionesDePago = exists(comprobante.$.CondicionesDePago);
            obj.confirmacion = exists(comprobante.$.Confirmacion);
            // initializar el objeto emisor
            obj.emisor = new Emisor();
            // obtner emisor del comprobante
            const comprobanteEmisor = comprobante['cfdi:Emisor'];
            if (comprobanteEmisor) {
                // generar objeto emisor
                obj.emisor.rfc = exists(comprobanteEmisor[0].$.Rfc);
                obj.emisor.nombre = exists(comprobanteEmisor[0].$.Nombre);
                obj.emisor.regimenFiscal = exists(comprobanteEmisor[0].$.RegimenFiscal);
            }
            // inicializar objeto receptor
            obj.receptor = new Receptor();
            // obtener receptor del comprobante
            const comprobanteReceptor = comprobante['cfdi:Receptor'];
            if (comprobanteReceptor) {
                // generar objeto receptor
                obj.receptor.rfc = exists(comprobanteReceptor[0].$.Rfc);
                obj.receptor.nombre = exists(comprobanteReceptor[0].$.Nombre);
                obj.receptor.residenciaFiscal = exists(comprobanteReceptor[0].$.ResidenciaFiscal);
                obj.receptor.numRegIdTrib = exists(comprobanteReceptor[0].$.NumRegIdTrib);
                obj.receptor.usoCFDI = exists(comprobanteReceptor[0].$.UsoCFDI);
            }
            // inicializar arreglo de conceptos
            obj.conceptos = [];
            // obtener conceptos del comprobante
            const comprobanteConceptos = comprobante['cfdi:Conceptos'];
            if (comprobanteConceptos) {
                const comprobanteConcepto = comprobanteConceptos[0]['cfdi:Concepto'];
                if (comprobanteConcepto) {
                    obj.conceptos = comprobanteConcepto.map((concepto: any): Concepto => {
                        let trasladosArr: Array<Traslado> = [];
                        let retencionesArr: Array<Retencion> = [];
                        const impuestos = concepto['cfdi:Impuestos'];
                        if (impuestos) {
                            const traslados = impuestos[0]['cfdi:Traslados'];
                            const retenciones = impuestos[0]['cfdi:Retenciones'];
                            if (traslados) {
                                const traslado = traslados[0]['cfdi:Traslado'];
                                trasladosArr = traslado.map((elem: any) => {
                                    return {
                                        impuesto: elem.$.Impuesto,
                                        tipoFactor: elem.$.TipoFactor,
                                        tasaOCuota: elem.$.TasaOCuota,
                                        importe: elem.$.Importe,
                                    };
                                });
                            }
                            if (retenciones) {
                                const retencion = retenciones[0]['cfdi:Retencion'];
                                retencionesArr = retencion.map((elem: any) => {
                                    return {
                                        impuesto: elem.$.Impuesto,
                                        tipoFactor: elem.$.TipoFactor,
                                        tasaOCuota: elem.$.TasaOCuota,
                                        importe: elem.$.Importe,
                                    };
                                });
                            }
                        }
                        return {
                            clave: exists(concepto.$.ClaveProdServ),
                            noIdentificacion: exists(concepto.$.NoIdentificacion),
                            cantidad: existsValue(concepto.$.Cantidad),
                            valorUnitario: existsValue(concepto.$.ValorUnitario),
                            claveUnidad: exists(concepto.$.ClaveUnidad),
                            unidad: exists(concepto.$.Unidad),
                            importe: existsValue(concepto.$.Importe),
                            descripcion: exists(concepto.$.Descripcion),
                            descuento: existsValue(concepto.$.Descuento),
                            traslados: trasladosArr,
                            retenciones: retencionesArr,
                        };
                    });
                }
            }
            // obtener cfdiRelacionado del comprobante
            const comprobanteCfdiRelacionados = comprobante['cfdi:CfdiRelacionados'];
            if (comprobanteCfdiRelacionados) {
                const comprobanteCfdiRelacionado = comprobanteCfdiRelacionados[0]['cfdi:CfdiRelacionado'];
                if (comprobanteCfdiRelacionado) {
                    // inicializar objeto cfdiRelacionado
                    obj.cfdiRelacionado = new CfdiRelacionado();
                    // generar objeto CfdiRelacionado
                    obj.cfdiRelacionado.tipoRelacion = exists(comprobanteCfdiRelacionados[0].$.TipoRelacion);
                    obj.cfdiRelacionado.uuid = exists(comprobanteCfdiRelacionado[0].$.UUID);
                }
            }
            // obtener complemento del comprobante
            const comprobanteComplemento = comprobante['cfdi:Complemento'];
            if (comprobanteComplemento) {
                // obtener el timbre fiscal digital del comprobante
                const comprobanteTimbreFiscalDigital = comprobanteComplemento[0]['tfd:TimbreFiscalDigital'];
                if (comprobanteTimbreFiscalDigital) {
                    // inicializar objeto timbreFiscalDigital
                    obj.timbreFiscalDigital = new TimbreFiscalDigital();
                    // generar objecto timbreFiscalDigital
                    obj.timbreFiscalDigital.uuid = exists(comprobanteTimbreFiscalDigital[0].$.UUID);
                    obj.timbreFiscalDigital.fechaTimbrado = exists(comprobanteTimbreFiscalDigital[0].$.FechaTimbrado);
                    obj.timbreFiscalDigital.selloSAT = exists(comprobanteTimbreFiscalDigital[0].$.SelloSAT);
                    obj.timbreFiscalDigital.selloCFD = exists(comprobanteTimbreFiscalDigital[0].$.SelloCFD);
                    obj.timbreFiscalDigital.noCertificadoSAT = exists(
                        comprobanteTimbreFiscalDigital[0].$.NoCertificadoSAT,
                    );
                    obj.timbreFiscalDigital.version = exists(comprobanteTimbreFiscalDigital[0].$.Version);
                }
                // inizializar arreglo de pagos
                obj.pagos = [];
                // obtener pagos
                const comprobantePagos = comprobanteComplemento[0]['pago10:Pagos'];
                if (comprobantePagos) {
                    const comprobantePago = comprobantePagos[0]['pago10:Pago'];
                    if (comprobantePago) {
                        obj.pagos = comprobantePago.map((pago: any) => {
                            const doctoRelacionado = pago['pago10:DoctoRelacionado'];
                            const pagoObj = new ComplementoPago();
                            pagoObj.fecha = pago.$.FechaPago;
                            pagoObj.formaPago = pago.$.FormaDePagoP;
                            pagoObj.moneda = pago.$.MonedaP;
                            pagoObj.tipoCambio = exists(pago.$.TipoCambioP);
                            pagoObj.monto = pago.$.Monto;
                            pagoObj.doctoRelacionados = [];
                            if (doctoRelacionado) {
                                pagoObj.doctoRelacionados = doctoRelacionado.map((doc: any) => ({
                                    uuid: doc.$.IdDocumento,
                                    moneda: doc.$.MonedaDR,
                                    tipoCambio: exists(doc.$.TipoCambioDR),
                                    metodoPago: doc.$.MetodoDePagoDR,
                                    numParcialidad: doc.$.NumParcialidad,
                                    saldoAnterior: doc.$.ImpSaldoAnt,
                                    importePagado: doc.$.ImpPagado,
                                    saldoInsoluto: doc.$.ImpSaldoInsoluto,
                                }));
                            }
                            return pagoObj;
                        });
                    }
                }
            }
            // obtener subtotal
            obj.subTotal = existsValue(comprobante.$.SubTotal);
            // obtener descuento
            obj.descuento = existsValue(comprobante.$.Descuento);
            // obtener total
            obj.total = existsValue(comprobante.$.Total);
            // inizializar arreglos de Impuestos
            obj.traslados = [];
            obj.retenciones = [];
            // obtener impuestos del comprobante
            const comprobanteImpuestos = comprobante['cfdi:Impuestos'];
            if (comprobanteImpuestos) {
                const traslados = comprobanteImpuestos[0]['cfdi:Traslados'];
                const retenciones = comprobanteImpuestos[0]['cfdi:Retenciones'];
                if (traslados) {
                    const traslado = traslados[0]['cfdi:Traslado'];
                    obj.traslados = traslado.map((elem: any) => {
                        return {
                            impuesto: elem.$.Impuesto,
                            tipoFactor: elem.$.TipoFactor,
                            tasaOCuota: elem.$.TasaOCuota,
                            importe: elem.$.Importe,
                        };
                    });
                }
                if (retenciones) {
                    const retencion = retenciones[0]['cfdi:Retencion'];
                    obj.retenciones = retencion.map((elem: any) => {
                        return {
                            impuesto: elem.$.Impuesto,
                            tipoFactor: elem.$.TipoFactor,
                            tasaOCuota: elem.$.TasaOCuota,
                            importe: elem.$.Importe,
                        };
                    });
                }
                obj.totalImpuestosRetenidos = existsValue(comprobanteImpuestos[0].$.TotalImpuestosRetenidos);
                obj.totalImpuestosTrasladados = existsValue(comprobanteImpuestos[0].$.TotalImpuestosTrasladados);
            }
            resolve(obj);
        } catch (e) {
            reject('CFDI no valido');
        }
    });
};
