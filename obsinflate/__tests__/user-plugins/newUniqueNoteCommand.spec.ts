import { Plugin } from '@obsinflate/user-plugins/plugin';
import { MockDateService } from '@obsinflate/tests/user-plugins/mocks/mockDateService';
import { NewUniqueNoteCommand } from '@obsinflate/user-plugins/newUniqueNoteCommand';
import Chance from 'chance';
import { mock, mockDeep } from 'jest-mock-extended';
import { TFile } from 'obsidian';
import { DurationLike } from 'luxon';
import { MockDate } from './mocks/mockDate';

describe('NewUniqueNoteCommand', () => {
    it('should call at least once plugin.app.vault.create', async () => {
        // Arrange
        const mockPlugin = mockDeep<Plugin>();
        const mockDateService = new MockDateService();
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            mockDateService
        );
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        expect(mockPlugin.app.vault.create).toHaveBeenCalled();
    });
    it('should create a "YYYYMMDDHHmm" file', async () => {
        // Arrange
        const mockPlugin = mockDeep<Plugin>();
        const chance = new Chance();
        const mockedNowResult = chance
            .integer({ min: 100000000000, max: 900000000000 })
            .toString();
        const mockDateService = {
            now: jest.fn().mockImplementation(() => {
                const mockDate = new MockDate();
                mockDate.toFormat = jest.fn().mockReturnValue(mockedNowResult);
                return mockDate;
            })
        };
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            mockDateService
        );
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        expect(mockPlugin.app.vault.create).toHaveBeenCalledWith(
            mockedNowResult,
            ''
        );
    });
    it('should create a "YYYYMMDDHHm(m+1)" file if the "YYYYMMDDHHmm" file already exists', async () => {
        // Arrange
        const chance = new Chance();
        const mockedNowResult = chance.integer({
            min: 100000000000,
            max: 900000000000
        });
        let mockedDateResult = mockedNowResult;
        const existingFilesCount = chance.integer({ min: 1, max: 30 });
        const createdFileName = (
            mockedNowResult + existingFilesCount
        ).toString();
        const mockPlugin = mockDeep<Plugin>({
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
        const mockDateService = {
            now: jest.fn().mockImplementation(() => {
                return {
                    toFormat: jest.fn().mockImplementation(() => {
                        return mockedDateResult.toString();
                    }),
                    plus: jest
                        .fn()
                        .mockImplementation((duration: DurationLike) => {
                            mockedDateResult += (
                                duration as { minutes: number }
                            ).minutes;
                        })
                };
            })
        };
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            mockDateService
        );
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        for (let i = 0; i < existingFilesCount; i++) {
            expect(mockPlugin.app.vault.create).toHaveBeenCalledWith(
                (mockedNowResult + i).toString(),
                ''
            );
        }
    });
});
