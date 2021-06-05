import { Cfdi } from '../parser/dataToCfdi';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
export interface Options {
    text?: string;
    image?: string;
    residenciaFiscal?: string;
    cadenaOriginal?: string;
}
/**
 * Receives a json and returns a pdf content object for pdfmake
 * @param {Cfdi} json result json from using parseData function
 */
export declare const generatePdfContent: (json: Cfdi, options: Options) => Promise<TDocumentDefinitions>;
