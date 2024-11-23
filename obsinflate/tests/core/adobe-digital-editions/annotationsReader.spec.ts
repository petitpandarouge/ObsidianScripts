import { File } from '@obsinflate/infrastructure/fileSystem';
import { mock } from 'jest-mock-extended';
import Chance from 'chance';
import { XmlParser } from '@obsinflate/infrastructure/xmlParser';
import { Annotations } from '@obsinflate/core/adobe-digital-editions/annotations';
import {
    ANNOTATION_TAG_NAME,
    ANNOTATIONS_TAG_NAME,
    AnnotationsReader,
    attributeValueProcessor,
    END_ATTRIBUTE_NAME,
    NO_PREFIX,
    START_ATTRIBUTE_NAME,
    updateTag
} from '@obsinflate/core/adobe-digital-editions/annotationsReader';
import { InvalidFileExtensionError } from '@obsinflate/infrastructure/invalidFileExtensionError';
import { PREVENT_CRASH_STRING } from '@obsinflate/tests/data/constants';
import { ANNOTATIONS_FILE_EXTENSION } from '@obsinflate/core/adobe-digital-editions/fileExtensions';
import { EpubPoint } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { EpubPointGenerator } from '@obsinflate/tests/data/epubPointGenerator';

describe('AnnotationsReader', () => {
    it('should throw an error if the file extension is invalid', async () => {
        // Arrange
        const chance = new Chance();
        const mockExtension = chance.string();
        const mockFile = mock<File>({
            extension: `.${mockExtension}`,
            read: jest.fn().mockResolvedValue(PREVENT_CRASH_STRING)
        });
        const mockXmlParser = mock<XmlParser<Annotations>>();
        const annotationsReader = new AnnotationsReader(mockXmlParser);
        // Act
        const action = async () => await annotationsReader.read(mockFile);
        // Assert
        await expect(action).rejects.toThrow(InvalidFileExtensionError);
        expect(mockFile.read).not.toHaveBeenCalled();
    });
    it('should call a well configured xml parser with the annotations file content', async () => {
        // Arrange
        const chance = new Chance();
        const mockContent = chance.string();
        const mockFile = mock<File>({
            extension: ANNOTATIONS_FILE_EXTENSION,
            read: jest.fn().mockResolvedValue(mockContent)
        });
        const mockXmlParser = mock<XmlParser<Annotations>>();
        const annotationsReader = new AnnotationsReader(mockXmlParser);
        // Act
        await annotationsReader.read(mockFile);
        // Assert
        expect(mockFile.read).toHaveBeenCalledTimes(1);
        expect(mockXmlParser.parse).toHaveBeenCalledTimes(1);
        expect(mockXmlParser.parse).toHaveBeenCalledWith(mockContent, {
            removeNSPrefix: true,
            ignoreAttributes: false,
            attributeNamePrefix: NO_PREFIX,
            attributeValueProcessor: attributeValueProcessor,
            updateTag: updateTag
        });
    });
});

describe('attributeValueProcessor', () => {
    it('should return an EpubPoint if the attribute name is start or end', () => {
        // Arrange
        const chance = new Chance();
        const mockAttrName = chance.pickone([
            START_ATTRIBUTE_NAME,
            END_ATTRIBUTE_NAME
        ]);
        const mockAttrValue = EpubPointGenerator.generate().pointAsString;
        // Act
        const result = attributeValueProcessor(mockAttrName, mockAttrValue);
        // Assert
        expect(result).toBeInstanceOf(EpubPoint);
    });
    it('should return the attribute value if the attribute name is not start or end', () => {
        // Arrange
        const chance = new Chance();
        const mockAttrName = chance.string();
        const mockAttrValue = chance.string();
        // Act
        const result = attributeValueProcessor(mockAttrName, mockAttrValue);
        // Assert
        expect(result).toBe(mockAttrValue);
    });
});

describe('updateTag', () => {
    it('should return the annotations tag name if the tag name is annotation', () => {
        // Arrange
        const tagName = ANNOTATION_TAG_NAME;
        // Act
        const result = updateTag(tagName);
        // Assert
        expect(result).toBe(ANNOTATIONS_TAG_NAME);
    });
    it('should return the tag name if the tag name is not annotation', () => {
        // Arrange
        const chance = new Chance();
        const tagName = chance.string();
        // Act
        const result = updateTag(tagName);
        // Assert
        expect(result).toBe(tagName);
    });
});
