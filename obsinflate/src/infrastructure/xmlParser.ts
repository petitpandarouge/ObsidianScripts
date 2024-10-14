import { InvalidXmlError } from '@obsinflate/infrastructure/invalidXmlError';
import { X2jOptions, XMLParser, XMLValidator } from 'fast-xml-parser';

export interface IXmlParser<TObject> {
    parse(xmlData: string, options: X2jOptions): TObject;
}

export class XmlParser<TObject> implements IXmlParser<TObject> {
    parse(xmlData: string, options: X2jOptions): TObject {
        const result = XMLValidator.validate(xmlData);
        if (result !== true) {
            throw new InvalidXmlError(result);
        }
        const parser = new XMLParser(options);
        const jsonObj = parser.parse(xmlData);
        return jsonObj as TObject;
    }
}
