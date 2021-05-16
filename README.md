# cfdi-pdf

A small library for generate xml CFDI PDF

## How to install

### ES6 module

```bash
npm install --save @ocelotlstudio\cfdi-pdf
```

## Usage

Then you're ready to generate pdf:

Simple Usage
```javascript
import { CfdiPdf } from '@ocelotlstudio\cfdi-pdf';

try{
    const xmlString = `<?xml version="1.0" encoding="utf-8"?>
        <cfdi:Comprobante Version="3.3" ...>
            ...
        </cfdi:Comprobante>`;
    /**
     * Function to get pdf from valid xml cfdi string
     * @param {string} xml
     * @param {Options=} options 
     * @returns {Promise<string>} a pdf in base64 string
     */
    const parserData = await CfdiPdf.generatePdf(xmlString);
}catch(e){
    console.log(e);
}

```

With options
```javascript
import { CfdiPdf } from '@ocelotlstudio\cfdi-pdf';

try{
    const xmlString = `<?xml version="1.0" encoding="utf-8"?>
        <cfdi:Comprobante Version="3.3" ...>
            ...
        </cfdi:Comprobante>`;
    const options = {
        text: 'onlytest',
        image: 'imageinbase64',
        cadenaOriginal: 'for visualice correct cadena original',
    };

    /**
     * Function to get pdf from valid xml cfdi string
     * @param {string} xml
     * @param {Options=} options 
     * @returns {Promise<string>} a pdf in base64 string
     */
    const parserData = await CfdiPdf.generatePdf(xmlString, options);
}catch(e){
    console.log(e);
}


```
## Features

* Generate PDF

## License

MIT