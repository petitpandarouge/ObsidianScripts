import {
    EPUB_POINT_COMPONENTS_SEPARATOR,
    EPUB_POINT_FILE_PATH_PREFIX
} from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { XHTML_FILE_EXTENSION } from '@obsinflate/core/fileExtensions';
import Chance from 'chance';

interface IntegerOptions {
    min: number;
    max: number;
}

const EPUB_ELEMENT_INDEXES_TO_OFFSET_SEPARATOR = ':';
const EPUB_FRAGMENT_IDENTIFIER_PREFIX = '#point(';
const EPUB_FRAGMENT_IDENTIFIER_SUFFIX = ')';

const chance = new Chance();

export class StringEpubPointGenerator {
    static generate(
        filePathElementsCount: Partial<IntegerOptions> = { min: 1, max: 5 },
        fragmentIdentifierPathComponentsElementsCount: Partial<IntegerOptions> = {
            min: 1,
            max: 5
        },
        fragmentIdentifierPathComponentsRange: Partial<IntegerOptions> = {
            min: 1,
            max: 100
        }
    ): string {
        const filePath = StringEpubPointGenerator.generateFilePath(
            filePathElementsCount
        );
        const fragmentIdentifier =
            StringEpubPointGenerator.generateFragmentIdentifier(
                fragmentIdentifierPathComponentsElementsCount,
                fragmentIdentifierPathComponentsRange
            );
        return `${filePath}${fragmentIdentifier}`;
    }

    private static generateFilePath(
        filePathElementsCount: Partial<IntegerOptions>
    ): string {
        const pathElements = [];
        for (let i = 0; i < chance.integer(filePathElementsCount); i++) {
            pathElements.push(chance.word());
        }
        return `${EPUB_POINT_FILE_PATH_PREFIX}${pathElements.join(EPUB_POINT_COMPONENTS_SEPARATOR)}${XHTML_FILE_EXTENSION}`;
    }

    private static generateFragmentIdentifier(
        fragmentIdentifierPathComponentsElementsCount: Partial<IntegerOptions>,
        fragmentIdentifierPathComponentsRange: Partial<IntegerOptions>
    ): string {
        return `${EPUB_FRAGMENT_IDENTIFIER_PREFIX}${this.generatePathComponents(fragmentIdentifierPathComponentsElementsCount, fragmentIdentifierPathComponentsRange)}${EPUB_FRAGMENT_IDENTIFIER_SUFFIX}`;
    }

    private static generatePathComponents(
        fragmentIdentifierPathComponentsElementsCount: Partial<IntegerOptions>,
        fragmentIdentifierPathComponentsRange: Partial<IntegerOptions>
    ): string {
        const elementIndexes = [];
        for (
            let i = 0;
            i < chance.integer(fragmentIdentifierPathComponentsElementsCount);
            i++
        ) {
            elementIndexes.push(
                chance.integer(fragmentIdentifierPathComponentsRange)
            );
        }
        const offset = chance.integer(fragmentIdentifierPathComponentsRange);
        return StringEpubPointGenerator.formatPathComponents(
            elementIndexes,
            offset
        );
    }

    private static formatPathComponents(
        elementIndexes: Number[],
        offset: Number
    ): string {
        return `${EPUB_POINT_COMPONENTS_SEPARATOR}${elementIndexes.join(EPUB_POINT_COMPONENTS_SEPARATOR)}${EPUB_ELEMENT_INDEXES_TO_OFFSET_SEPARATOR}${offset}`;
    }
}
