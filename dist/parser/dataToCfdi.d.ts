export declare class Retencion {
    impuesto: string;
    tipoFactor: string;
    tasaOCuota: string;
    importe: string;
    base?: string;
}
export declare class Traslado {
    impuesto: string;
    tipoFactor: string;
    tasaOCuota: string;
    importe: string;
    base?: string;
}
export declare class DoctoRelacionado {
    uuid: string;
    moneda: string;
    tipoCambio: string;
    metodoPago: string;
    numParcialidad: string;
    saldoAnterior: string;
    importePagado: string;
    saldoInsoluto: string;
}
export declare class ComplementoPago {
    fecha: string;
    formaPago: string;
    moneda: string;
    tipoCambio: string;
    monto: string;
    doctoRelacionados: Array<DoctoRelacionado>;
}
export declare class TimbreFiscalDigital {
    uuid: string;
    fechaTimbrado: string;
    selloSAT: string;
    selloCFD: string;
    noCertificadoSAT: string;
    version: string;
}
export declare class CfdiRelacionado {
    tipoRelacion: string;
    uuid: string;
}
export declare class Concepto {
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
export declare class Receptor {
    rfc: string;
    nombre: string;
    residenciaFiscal: string;
    numRegIdTrib: string;
    usoCFDI: string;
}
export declare class Emisor {
    rfc: string;
    nombre: string;
    regimenFiscal: string;
}
export declare class Cfdi {
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
export declare const dataToCfdi: (xmlData: any) => Promise<Cfdi>;
