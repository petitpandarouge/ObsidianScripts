import Chance from 'chance';
import { mock, mockDeep } from 'jest-mock-extended';
import { File, IFileSystem } from '@obsinflate/infrastructure/fileSystem';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { INoticer } from '@obsinflate/api/obsidian/noticer';
import { BUSINESS_ERROR_COLOR } from '@obsinflate/api/obsidian/color';
import { FilesSuggester } from '@obsinflate/inflates/quick-add/files-suggester/script';
import { FilesSuggesterSettings } from '@obsinflate/inflates/quick-add/files-suggester/settings';

describe('FilesSuggester', () => {
    it('should suggest the files directly contained into the settings directoryPath property', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockSettings = mock<FilesSuggesterSettings>({
            directoryPath: chance.sentence()
        });
        const filesCount = chance.integer({ min: 1, max: 10 });
        const files: File[] = [];
        for (let i = 0; i < filesCount; i++) {
            files.push(mock<File>());
        }
        const mockFileSystem = mockDeep<IFileSystem>({
            getFiles: jest.fn().mockReturnValue(files)
        });
        const suggester = new FilesSuggester(
            errorNoticer,
            mockSettings,
            mockFileSystem
        );
        const mockParams = mockDeep<Parameters>();
        // Act
        await suggester.entry(mockParams);
        // Assert
        expect(mockFileSystem.getFiles).toHaveBeenCalledWith(
            mockSettings.directoryPath
        );
        expect(mockParams.quickAddApi.suggester).toHaveBeenCalledWith(
            files.map((f) => f.name),
            files.map((f) => f.name)
        );
    });
    it('should notice a NoFileSelectedError error if no file is selected from the suggestions', async () => {
        // Arrange
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const noticeSpy = jest.spyOn(errorNoticer as any, 'notice');
        const mockSettings = mock<FilesSuggesterSettings>();
        const mockFileSystem = mockDeep<IFileSystem>({
            getFiles: jest.fn().mockReturnValue([])
        });
        const suggester = new FilesSuggester(
            errorNoticer,
            mockSettings,
            mockFileSystem
        );
        const mockParams = mockDeep<Parameters>({
            quickAddApi: { suggester: jest.fn().mockResolvedValue(undefined) }
        });
        // Act
        await suggester.entry(mockParams);
        // Assert
        expect(noticeSpy).toHaveBeenCalledWith(
            'No file selected. Aborting pipeline.',
            BUSINESS_ERROR_COLOR
        );
    });
    it('should set the selected file into the "Settings.selectedFileVariableName" property', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockSettings = mock<FilesSuggesterSettings>();
        const selectedFileName = chance.sentence();
        const mockFileSystem = mockDeep<IFileSystem>({
            getFiles: jest.fn().mockReturnValue([
                mock<File>({
                    name: selectedFileName
                })
            ])
        });
        const suggester = new FilesSuggester(
            errorNoticer,
            mockSettings,
            mockFileSystem
        );
        const mockParams = mockDeep<Parameters>({
            quickAddApi: {
                suggester: jest.fn().mockResolvedValue(selectedFileName)
            }
        });
        // Act
        await suggester.entry(mockParams);
        // Assert
        expect(
            (
                mockParams.variables[
                    mockSettings.selectedFileVariableName
                ] as File
            ).name
        ).toBe(selectedFileName);
    });
});
