import {
    EPUB_POINT_COMPONENTS_SEPARATOR,
    EPUB_POINT_FILE_PATH_PREFIX,
    EpubPoint
} from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { XHTML_FILE_EXTENSION } from '@obsinflate/core/fileExtensions';
import Chance from 'chance';

const EPUB_ELEMENT_INDEXES_TO_OFFSET_SEPARATOR = ':';
const EPUB_FRAGMENT_IDENTIFIER_PREFIX = '#point(';
const EPUB_FRAGMENT_IDENTIFIER_SUFFIX = ')';

interface IntegerOptions {
    min: number;
    max: number;
}

interface PathComponents {
    elementIndexes: number[];
    offset: number;
}

interface EpubPointGeneratorResult extends PathComponents {
    filePath: string;
    pointAsString: string;
}

const chance = new Chance();

export enum Operation {
    Add,
    Subtract
}

export class EpubPointGenerator {
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
    ): EpubPointGeneratorResult {
        const filePath = EpubPointGenerator.generateFilePath(
            filePathElementsCount
        );
        const pathComponents = EpubPointGenerator.generatePathComponents(
            fragmentIdentifierPathComponentsElementsCount,
            fragmentIdentifierPathComponentsRange
        );
        const pointAsString = EpubPointGenerator.formatPoint(
            filePath,
            pathComponents
        );
        return {
            filePath,
            pointAsString,
            ...pathComponents
        };
    }

    static generateFrom(
        point: EpubPoint,
        operation: Operation,
        offsetRange: Partial<IntegerOptions> = { min: 1, max: 100 }
    ): EpubPointGeneratorResult {
        const pathComponents = EpubPointGenerator.applyOffset(
            point,
            operation,
            offsetRange
        );
        const pointAsString = EpubPointGenerator.formatPoint(
            point.filePath,
            pathComponents
        );
        return {
            filePath: point.filePath,
            pointAsString,
            ...pathComponents
        };
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

    private static generatePathComponents(
        fragmentIdentifierPathComponentsElementsCount: Partial<IntegerOptions>,
        fragmentIdentifierPathComponentsRange: Partial<IntegerOptions>
    ): PathComponents {
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
        return {
            elementIndexes,
            offset
        };
    }

    private static formatPoint(
        filePath: string,
        pathComponents: PathComponents
    ): string {
        return `${filePath}${this.formatFragmentIdentifier(pathComponents)}`;
    }

    private static formatFragmentIdentifier(
        pathComponents: PathComponents
    ): string {
        return `${EPUB_FRAGMENT_IDENTIFIER_PREFIX}${this.formatPathComponents(pathComponents)}${EPUB_FRAGMENT_IDENTIFIER_SUFFIX}`;
    }

    private static formatPathComponents(
        pathComponents: PathComponents
    ): string {
        return `${EPUB_POINT_COMPONENTS_SEPARATOR}${pathComponents.elementIndexes.join(EPUB_POINT_COMPONENTS_SEPARATOR)}${EPUB_ELEMENT_INDEXES_TO_OFFSET_SEPARATOR}${pathComponents.offset}`;
    }

    private static applyOffset(
        point: EpubPoint,
        operation: Operation,
        offsetRange: Partial<IntegerOptions>
    ): PathComponents {
        const offset = chance.integer(offsetRange);
        const index = chance.integer({
            min: 0,
            max: point.elementIndexes.length
        });
        if (index === point.elementIndexes.length) {
            return {
                elementIndexes: point.elementIndexes,
                offset:
                    operation == Operation.Add
                        ? point.offset + offset
                        : point.offset - offset
            };
        }
        const elementIndexes = point.elementIndexes.slice();
        operation == Operation.Add
            ? (elementIndexes[index] += offset)
            : (elementIndexes[index] -= offset);
        return {
            elementIndexes,
            offset: point.offset
        };
    }
}
