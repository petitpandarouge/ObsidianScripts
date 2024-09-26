import { NewUniqueNoteCommand } from '@obsinflate/inflates/user-plugins/newUniqueNoteCommand';
import Chance from 'chance';
import { mock, mockDeep } from 'jest-mock-extended';
import { TFile } from 'obsidian';
import { IUniqueNameGenerator } from '@obsinflate/uniqueNameGenerator';
import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';

describe('NewUniqueNoteCommand', () => {
    it('should call at least once plugin.app.vault.create', async () => {
        // Arrange
        const mockPlugin = mockDeep<UserPlugins>();
        const mockGenerator = mock<IUniqueNameGenerator>();
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            mockGenerator
        );
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        expect(mockPlugin.app.vault.create).toHaveBeenCalled();
    });
    it('should create a "YYYYMMDDHHmm" file', async () => {
        // Arrange
        const mockPlugin = mockDeep<UserPlugins>();
        const chance = new Chance();
        const mockNowResult = chance
            .integer({ min: 100000000000, max: 900000000000 })
            .toString();
        const mockGenerator = mock<IUniqueNameGenerator>({
            generateFromNow: jest.fn().mockReturnValue(mockNowResult)
        });
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            mockGenerator
        );
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        expect(mockPlugin.app.vault.create).toHaveBeenCalledWith(
            mockNowResult,
            ''
        );
    });
    it('should create a "YYYYMMDDHHm(m+1)" file if the "YYYYMMDDHHmm" file already exists', async () => {
        // Arrange
        const chance = new Chance();
        const mockNowResult = chance.integer({
            min: 100000000000,
            max: 900000000000
        });
        let mockGeneratorResult = mockNowResult;
        const existingFilesCount = chance.integer({ min: 1, max: 30 });
        const createdFileName = (mockNowResult + existingFilesCount).toString();
        const mockPlugin = mockDeep<UserPlugins>({
            app: {
                vault: {
                    create: jest.fn().mockImplementation((path: string) => {
                        if (path !== createdFileName) {
                            throw new Error('File already exists');
                        }
                        return Promise.resolve<TFile>(mock<TFile>());
                    })
                }
            }
        });
        const mockGenerator = mock<IUniqueNameGenerator>({
            generateFromNow: jest.fn().mockImplementation(() => {
                const result = mockGeneratorResult.toString();
                mockGeneratorResult++;
                return result;
            })
        });
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            mockGenerator
        );
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        for (let i = 0; i < existingFilesCount + 1; i++) {
            expect(mockPlugin.app.vault.create).toHaveBeenCalledWith(
                (mockNowResult + i).toString(),
                ''
            );
        }
    });
});
