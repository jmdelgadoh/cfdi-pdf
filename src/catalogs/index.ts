import clavesUnidadesRaw from './cfdi_claves_unidades.json';
import formasPagoRaw from './cfdi_formas_pago.json';
import impuestosRaw from './cfdi_impuestos.json';
import metodosPagoRaw from './cfdi_metodos_pago.json';
import monedasRaw from './cfdi_monedas.json';
import regimenesFiscalesRaw from './cfdi_regimenes_fiscales.json';
import tiposComprobantesRaw from './cfdi_tipos_comprobantes.json';
import tiposRelacionesRaw from './cfdi_tipos_relaciones.json';
import usosCfdiRaw from './cfdi_usos_cfdi.json';

const clavesUnidadesCatalog: Record<string, string> = Object.assign(
    {},
    ...clavesUnidadesRaw.map((item) => ({ [item.id]: item.texto })),
);
const formasPagoCatalog: Record<string, string> = Object.assign(
    {},
    ...formasPagoRaw.map((item) => ({ [item.id]: item.texto })),
);
const impuestosCatalog: Record<string, string> = Object.assign(
    {},
    ...impuestosRaw.map((item) => ({ [item.id]: item.texto })),
);
const metodosPagoCatalog: Record<string, string> = Object.assign(
    {},
    ...metodosPagoRaw.map((item) => ({ [item.id]: item.texto })),
);
const monedasCatalog: Record<string, string> = Object.assign(
    {},
    ...monedasRaw.map((item) => ({ [item.id]: item.texto })),
);
const regimenesFiscalesCatalog: Record<string, string> = Object.assign(
    {},
    ...regimenesFiscalesRaw.map((item) => ({ [item.id]: item.texto })),
);
const tiposComprobantesCatalog: Record<string, string> = Object.assign(
    {},
    ...tiposComprobantesRaw.map((item) => ({ [item.id]: item.texto })),
);
const tiposRelacionesCatalog: Record<string, string> = Object.assign(
    {},
    ...tiposRelacionesRaw.map((item) => ({ [item.id]: item.texto })),
);
const usosCfdiCatalog: Record<string, string> = Object.assign(
    {},
    ...usosCfdiRaw.map((item) => ({ [item.id]: item.texto })),
);

export {
    clavesUnidadesCatalog,
    formasPagoCatalog,
    impuestosCatalog,
    metodosPagoCatalog,
    monedasCatalog,
    regimenesFiscalesCatalog,
    tiposComprobantesCatalog,
    tiposRelacionesCatalog,
    usosCfdiCatalog,
};
