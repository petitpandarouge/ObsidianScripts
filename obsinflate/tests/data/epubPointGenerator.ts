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

export enum OffsetOperation {
    AddElementIndexes,
    AddOnOffset,
    AddOnElementIndex,
    Random
}

const chance = new Chance();

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

    static generateFromWithOffset(
        point: EpubPoint,
        offsetOperation: OffsetOperation = OffsetOperation.Random,
        offsetRange: Partial<IntegerOptions> = { min: 1, max: 100 }
    ): EpubPointGeneratorResult {
        const pathComponents = EpubPointGenerator.applyOffset(
            point,
            offsetOperation,
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
        offsetOperation: OffsetOperation,
        offsetRange: Partial<IntegerOptions>
    ): PathComponents {
        const offset = chance.integer(offsetRange);
        const pointElementIndexes = point.elementIndexes.slice();
        let pointOffset = point.offset;
        if (offsetOperation === OffsetOperation.Random) {
            offsetOperation = chance.pickone([
                OffsetOperation.AddElementIndexes,
                OffsetOperation.AddOnOffset,
                OffsetOperation.AddOnElementIndex
            ]);
        }
        if (offsetOperation === OffsetOperation.AddElementIndexes) {
            for (let i = 0; i < offset; i++) {
                pointElementIndexes.push(chance.integer(offsetRange));
            }
        } else if (offsetOperation === OffsetOperation.AddOnOffset) {
            pointOffset += offset;
        } else if (offsetOperation === OffsetOperation.AddOnElementIndex) {
            const index = chance.integer({
                min: 0,
                max: point.elementIndexes.length - 1
            });
            pointElementIndexes[index] += offset;
        }

        return {
            elementIndexes: pointElementIndexes,
            offset: pointOffset
        };
    }
}
