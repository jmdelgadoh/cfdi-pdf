import { readFileSync, writeFileSync } from 'fs';
import { CfdiPdf } from '../src/CfdiPdf';

describe('CfdiPdf', () => {
    it('numberToCurrency works', async () => {
        expect(await CfdiPdf.numberToCurrency(1500)).toBe('MIL QUINIENTOS PESOS 00/100 M.N.');
        expect(await CfdiPdf.numberToCurrency(2000.5)).toBe('DOS MIL PESOS 50/100 M.N.');
    }, 10000);

    it('cfdi parser works', async () => {
        const fileContent = readFileSync(`${__dirname}/files/invoice.xml`);
        const parserData = await CfdiPdf.generatePdf(fileContent.toString());
        expect(typeof parserData === 'string').toBe(true);
        // writeFileSync('test.pdf', parserData, { encoding: 'base64' });
    }, 10000);
});
