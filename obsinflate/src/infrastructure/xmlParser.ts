import { InvalidXmlError } from '@obsinflate/infrastructure/invalidXmlError';
import { X2jOptions, XMLParser, XMLValidator } from 'fast-xml-parser';

export class XmlParser<TObject> {
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
