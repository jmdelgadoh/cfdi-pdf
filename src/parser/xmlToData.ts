import { parseString } from 'xml2js';

export const parseXml = (xml: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        parseString(xml, (err, res) => {
            res ? resolve(res) : reject(err);
        });
    });
};
