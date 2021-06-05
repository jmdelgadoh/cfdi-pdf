import { Options } from './builder/generateContent';
/**
 * CfdiPdf namespace
 */
export declare namespace CfdiPdf {
    /**
     * Function to get entire number to currency actually only spanish mexico
     * @param {number} number
     * @param {string=} moneda
     * @returns {Promise<string>} a promise of string currency
     */
    const numberToCurrency: (num: number, moneda?: string) => Promise<string>;
    /**
     * Function to get pdf from valid xml cfdi string
     * @param {string} xml
     * @param {Options=} options
     * @returns {Promise<string>} a pdf in base64 string
     */
    const generatePdf: (xml: string, options?: Options) => Promise<string>;
}
