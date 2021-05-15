import { toCurrency } from './utils/toCurrency';
import {
    CatalogItem,
    clavesUnidadesRaw,
    formasPagosRaw,
    impuestosRaw,
    metodosPagoRaw,
    monedasRaw,
    regimenesFiscalesRaw,
    tiposComprobantesRaw,
    tiposRelacionesRaw,
    usosCfdiRaw,
} from './catalogs';

/**
 * CfdiPdf namespace
 */
export namespace CfdiPdf {
    /**
     * Function to get entire number to currency actually only spanish mexico
     * @param {number} number
     * @param {string=} moneda
     * @returns {Promise<string>} a promise of string currency
     */
    export const numberToCurrency = toCurrency;

    /**
     * Catalogs namespace
     */
    export namespace Catalogs {
        export const clavesUnidades: Array<CatalogItem> = clavesUnidadesRaw;
        export const formasPago: Array<CatalogItem> = formasPagosRaw;
        export const impuestos: Array<CatalogItem> = impuestosRaw;
        export const metodosPago: Array<CatalogItem> = metodosPagoRaw;
        export const monedas: Array<CatalogItem> = monedasRaw;
        export const regimenesFiscales: Array<CatalogItem> = regimenesFiscalesRaw;
        export const tiposComprobantes: Array<CatalogItem> = tiposComprobantesRaw;
        export const tiposRelaciones: Array<CatalogItem> = tiposRelacionesRaw;
        /**
         * CFDI Uses Catalog
         * @returns {Array<CatalogItem>}
         */
        export const usosCfdi: Array<CatalogItem> = usosCfdiRaw;
    }
}
