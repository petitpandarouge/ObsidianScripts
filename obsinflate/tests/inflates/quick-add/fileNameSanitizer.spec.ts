import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { FileNameSanitizer } from '@obsinflate/inflates/quick-add/file-name-sanitizer/script';
import { FileNameSanitizerSettings } from '@obsinflate/inflates/quick-add/file-name-sanitizer/settings';
import { mock, mockDeep } from 'jest-mock-extended';
import { FileNameSanitizer as FileNameSanitizerService } from '@obsinflate/core/fileNameSanitizer';
import Chance from 'chance';

describe('FileNameSanitizer', () => {
    it('should sanitize the "Settings.fileNameVariableName" variable and put the result in "Settings.sanitizedFileNameVariableName" variable', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<Noticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockSettings: FileNameSanitizerSettings = {
            fileNameVariableName: chance.word(),
            sanitizedFileNameVariableName: chance.word()
        };
        const sanitizedFileName = chance.word();
        const mockSanitizer = mock<FileNameSanitizerService>({
            sanitize: jest.fn().mockImplementation(() => {
                return sanitizedFileName;
            })
        });
        const mockParams = mockDeep<Parameters>({
            variables: {
                [mockSettings.fileNameVariableName]: chance.word()
            }
        });
        const script = new FileNameSanitizer(
            errorNoticer,
            mockSettings,
            mockSanitizer
        );
        // Act
        await script.entry(mockParams);
        // Assert
        expect(mockSanitizer.sanitize).toHaveBeenCalledWith(
            mockParams.variables[mockSettings.fileNameVariableName]
        );
        expect(
            mockParams.variables[mockSettings.sanitizedFileNameVariableName]
        ).toBe(sanitizedFileName);
    });
});
