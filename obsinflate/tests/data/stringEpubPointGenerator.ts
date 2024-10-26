import {
    EPUB_POINT_COMPONENTS_SEPARATOR,
    EPUB_POINT_FILE_PATH_PREFIX
} from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { XHTML_FILE_EXTENSION } from '@obsinflate/core/fileExtensions';
import Chance from 'chance';

const EPUB_ELEMENT_INDEXES_TO_OFFSET_SEPARATOR = ':';
const EPUB_FRAGMENT_IDENTIFIER_PREFIX = '#point(';
const EPUB_FRAGMENT_IDENTIFIER_SUFFIX = ')';

const chance = new Chance();

export class StringEpubPointGenerator {
    static generate(): string {
        const filePath = StringEpubPointGenerator.generateFilePath();
        const fragmentIdentifier =
            StringEpubPointGenerator.generateFragmentIdentifier();
        return `${filePath}${fragmentIdentifier}`;
    }

    private static generateFilePath(): string {
        const pathElements = [];
        for (let i = 0; i < chance.integer({ min: 1, max: 5 }); i++) {
            pathElements.push(chance.word());
        }
        return `${EPUB_POINT_FILE_PATH_PREFIX}${pathElements.join(EPUB_POINT_COMPONENTS_SEPARATOR)}${XHTML_FILE_EXTENSION}`;
    }

    private static generateFragmentIdentifier(): string {
        return `${EPUB_FRAGMENT_IDENTIFIER_PREFIX}${this.generatePathComponents()}${EPUB_FRAGMENT_IDENTIFIER_SUFFIX}`;
    }

    private static generatePathComponents(): string {
        const elementIndexes = [];
        for (let i = 0; i < chance.integer({ min: 1, max: 5 }); i++) {
            elementIndexes.push(chance.integer({ min: 1, max: 100 }));
        }
        const offset = chance.integer({ min: 1, max: 100 });
        return `${EPUB_POINT_COMPONENTS_SEPARATOR}${elementIndexes.join(EPUB_POINT_COMPONENTS_SEPARATOR)}${EPUB_ELEMENT_INDEXES_TO_OFFSET_SEPARATOR}${offset}`;
    }
}
