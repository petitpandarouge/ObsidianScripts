import { File } from '@obsinflate/infrastructure/fileSystem';
import { mock } from 'jest-mock-extended';
import Chance from 'chance';
import { IXmlParser } from '@obsinflate/infrastructure/xmlParser';
import { Annotations } from '@obsinflate/infrastructure/adobe-digital-editions/annotations';
import {
    AnnotationsReader,
    attributeValueProcessor,
    NO_PREFIX,
    updateTag
} from '@obsinflate/infrastructure/adobe-digital-editions/annotationsReader';
import { InvalidFileExtensionError } from '@obsinflate/infrastructure/invalidFileExtensionError';
import { PREVENT_CRASH_STRING } from '@obsinflate/tests/data/constants';
import { ANNOTATIONS_FILE_EXTENSION } from '@obsinflate/core/adobe-digital-editions/fileExtensions';

describe('AnnotationsReader', () => {
    it('should throw an error if the file extension is invalid', async () => {
        // Arrange
        const chance = new Chance();
        const mockExtension = chance.string();
        const mockFile = mock<File>({
            extension: `.${mockExtension}`,
            read: jest.fn().mockResolvedValue(PREVENT_CRASH_STRING)
        });
        const mockXmlParser = mock<IXmlParser<Annotations>>();
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
        const mockXmlParser = mock<IXmlParser<Annotations>>();
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
