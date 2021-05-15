import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { generatePdfContent, Options } from './builder/generateContent';
import { dataToCfdi } from './parser/dataToCfdi';
import { parseXml } from './parser/xmlToData';
import { toCurrency } from './utils/toCurrency';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

    export const generatePdf = (xml: string, options: Options = {}): Promise<string> => {
        return new Promise<string>(async (resolve, reject) => {
            try {
                const xmlData = await parseXml(xml);
                const cfdiData = await dataToCfdi(xmlData);
                const content = await generatePdfContent(cfdiData, options);
                const pdfDocGenerator = pdfMake.createPdf(content);
                pdfDocGenerator.getBase64((data) => {
                    resolve(data);
                });
            } catch (e) {
                reject(e);
            }
        });
    };
}
