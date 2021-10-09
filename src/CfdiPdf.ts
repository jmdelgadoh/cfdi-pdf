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
type FinalObject = {
    data: string,
    contentObject: string
}
export namespace CfdiPdf {
    /**
     * Function to get entire number to currency actually only spanish mexico
     * @param {number} number
     * @param {string=} moneda
     * @returns {Promise<string>} a promise of string currency
     */
    export const numberToCurrency = toCurrency;

    /**
     * Function to get pdf from valid xml cfdi string
     * @param {string} xml
     * @param {Options=} options 
     * @returns {Promise<string>} a pdf in base64 string
     */
    export const generatePdf = (xml: string, options: Options = {}): Promise<FinalObject> => {
        pdfMake.tableLayouts = {
            cbBorders: {
                hLineWidth: function (i, node) {
                    if (i === 0) {
                        return 0;
                    }

                    if (i === 1)
                        return 2;

                    return 1;
                },
                vLineWidth: function (i) {
                    return 1;
                },
                vLineColor: function(i){
                    return '#999';
                },
                hLineColor: function (i) {
                    return i === 1 ? '#241FFF' : '#999';
                },
                paddingLeft: function (i) {
                    return 2;
                },
                paddingRight: function (i, node) {
                    return i === node.table.widths.length - 1 ? 0 : 8;
                },
                // fillColor: function (i, node) {
                //     if (i === 0 || i === 1){
                //         return '#241FFF'
                //     }
                //
                // },
                // fillOpacity: function (i){
                //     if (i === 0) return 0.9;
                //     else if (i === 1) return 0.3;
                //     else return 0;
                // },
            },
        };

        return new Promise<FinalObject>(async (resolve, reject) => {
            try {
                const xmlData = await parseXml(xml); //converts xml to json
                const cfdiData = await dataToCfdi(xmlData); // validates CFDI data and returns cfdi data as an object

                const content = await generatePdfContent(cfdiData, options);

                const pdfDocGenerator = pdfMake.createPdf(content);
                pdfDocGenerator.getBase64((data) => {
                    resolve({ data, contentObject: JSON.stringify(content) });
                });
            } catch (e) {
                reject(e);
            }
        });
    };
}
