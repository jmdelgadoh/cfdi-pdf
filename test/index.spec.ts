import { CfdiPdf } from '../src/CfdiPdf';

describe('CfdiPdf', () => {
    it('numberToCurrency works', async () => {
        expect(await CfdiPdf.numberToCurrency(1500)).toBe('MIL QUINIENTOS PESOS 00/100 M.N.');
        expect(await CfdiPdf.numberToCurrency(2000.5)).toBe('DOS MIL PESOS 50/100 M.N.');
    }, 10000);

    it('catalogs works', async () => {
        const usosCdfi = CfdiPdf.Catalogs.usosCfdi;
        expect(usosCdfi.find((x) => x.id === 'G03').texto).toBe('Gastos en general');
        const clavesUnidades = CfdiPdf.Catalogs.clavesUnidades;
        expect(clavesUnidades.find((x) => x.id === '31').texto).toBe('Pescar');
        expect(clavesUnidades.find((x) => x.id === '')).toBe(undefined);
    });
});
