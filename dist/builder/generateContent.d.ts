import { Cfdi } from '../parser/dataToCfdi';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
export interface Options {
    title?: string;
    text?: string;
    logo?: string;
    bgLogo?: string;
    logoSmall?: string;
    url?: string;
    address?: string;
    cadenaOriginal?: string;
}
/**
 * Receives a json and returns a pdf content object for pdfmake
 * @param {Cfdi} json result json from using parseData function
 * @param options
 */
export declare const generatePdfContent: (json: Cfdi, options: Options) => Promise<TDocumentDefinitions>;
