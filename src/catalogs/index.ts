import clavesUnidadesRaw from './cfdi_claves_unidades.json';
import formasPagosRaw from './cfdi_formas_pago.json';
import impuestosRaw from './cfdi_impuestos.json';
import metodosPagoRaw from './cfdi_metodos_pago.json';
import monedasRaw from './cfdi_monedas.json';
import regimenesFiscalesRaw from './cfdi_regimenes_fiscales.json';
import tiposComprobantesRaw from './cfdi_tipos_comprobantes.json';
import tiposRelacionesRaw from './cfdi_tipos_relaciones.json';
import usosCfdiRaw from './cfdi_usos_cfdi.json';

interface CatalogItem {
    id: string;
    texto: string;
}

export {
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
};
