import { XmlParser } from '@obsinflate/infrastructure/xmlParser';
import { File } from '@obsinflate/infrastructure/fileSystem';
import { ANNOTATIONS_FILE_EXTENSION } from '@obsinflate/inflates/quick-add/koboHighlightsImporter';
import { InvalidFileExtensionError } from '@obsinflate/infrastructure/invalidFileExtensionError';
import { EpubPoint } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { Annotations } from '@obsinflate/infrastructure/adobe-digital-editions/annotations';

const NO_PREFIX = '';

export interface IAnnotationsReader {
    read(file: File): Promise<Annotations>;
}

export class AnnotationsReader implements IAnnotationsReader {
    async read(file: File): Promise<Annotations> {
        if (file.extension !== ANNOTATIONS_FILE_EXTENSION) {
            throw new InvalidFileExtensionError(
                file.path,
                ANNOTATIONS_FILE_EXTENSION
            );
        }
        const xmlData = await file.read();
        const reader = new XmlParser<Annotations>();
        const annotations = reader.parse(xmlData, {
            removeNSPrefix: true,
            ignoreAttributes: false,
            attributeNamePrefix: NO_PREFIX,
            attributeValueProcessor: (attrName, attrValue) => {
                if (attrName === 'start' || attrName === 'end') {
                    return EpubPoint.FromString(attrValue);
                }
                return attrValue;
            },
            updateTag: (tagName) => {
                if (tagName === 'annotation') {
                    return 'annotations';
                }
                return tagName;
            }
        });
        return annotations;
    }
}
