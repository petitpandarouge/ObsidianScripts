import {
    MAX_NOTE_CREATION_ATTEMPS,
    NewUniqueNoteCommand,
    NO_DATA
} from '@obsinflate/inflates/user-plugins/newUniqueNoteCommand';
import Chance from 'chance';
import { mock, mockDeep } from 'jest-mock-extended';
import { TFile } from 'obsidian';
import { IUniqueNameGenerator } from '@obsinflate/core/uniqueNameGenerator';
import { UserPlugins } from '@obsinflate/api/user-plugins/userPlugins';
import { IAppExtension } from '@obsinflate/api/obsidian/appExtension';
import path from 'path';
import { NoActiveNoteFoundError } from '@obsinflate/api/obsidian/noActiveNoteFoundError';
import { PanelPosition } from '@obsinflate/api/obsidian/panelPosition';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { INoticer } from '@obsinflate/api/obsidian/noticer';
import { BUSINESS_ERROR_COLOR } from '@obsinflate/api/obsidian/color';
import { MarkdownViewLeafExtension } from '@obsinflate/api/obsidian/markdownViewLeafExtension';
import { MARKDOWN_FILE_EXTENSION } from '@obsinflate/core/fileExtensions';

const EMPTY_PATH = '';
const EMPTY_NAME = '';

describe('NewUniqueNoteCommand', () => {
    it('should call at least once plugin.app.vault.create', async () => {
        // Arrange
        const mockPlugin = mockDeep<UserPlugins>();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockGenerator = mock<IUniqueNameGenerator>({
            generateFromNow: jest.fn().mockReturnValue(EMPTY_NAME)
        });
        const mockApp = mock<IAppExtension>({
            workspace: {
                getCenterPanelMarkdownActiveLeaf: jest
                    .fn()
                    .mockImplementation(() => {
                        return mock<MarkdownViewLeafExtension>({
                            getFolderPath: jest
                                .fn()
                                .mockReturnValue(EMPTY_PATH),
                            native: {
                                openFile: jest.fn()
                            }
                        });
                    })
            }
        });
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            errorNoticer,
            mockGenerator,
            mockApp
        );
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        expect(mockPlugin.app.vault.create).toHaveBeenCalledTimes(1);
    });
    it('should create a "YYYYMMDDHHmm.md" note', async () => {
        // Arrange
        const mockPlugin = mockDeep<UserPlugins>();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const chance = new Chance();
        const mockNowResult = chance
            .integer({ min: 100000000000, max: 900000000000 })
            .toString();
        const mockGenerator = mock<IUniqueNameGenerator>({
            generateFromNow: jest.fn().mockReturnValue(mockNowResult)
        });
        const mockApp = mock<IAppExtension>({
            workspace: {
                getCenterPanelMarkdownActiveLeaf: jest
                    .fn()
                    .mockImplementation(() => {
                        return mock<MarkdownViewLeafExtension>({
                            getFolderPath: jest
                                .fn()
                                .mockReturnValue(EMPTY_PATH),
                            native: {
                                openFile: jest.fn()
                            }
                        });
                    })
            }
        });
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            errorNoticer,
            mockGenerator,
            mockApp
        );
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        expect(mockPlugin.app.vault.create).toHaveBeenCalledWith(
            `${mockNowResult}.${MARKDOWN_FILE_EXTENSION}`,
            NO_DATA
        );
    });
    it('should create a "YYYYMMDDHHm(m+1).md" note if the "YYYYMMDDHHmm.md" file already exists', async () => {
        // Arrange
        const chance = new Chance();
        const mockNowResult = chance.integer({
            min: 100000000000,
            max: 900000000000
        });
        let mockGeneratorResult = mockNowResult;
        const existingFilesCount = chance.integer({ min: 1, max: 9 });
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
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockGenerator = mock<IUniqueNameGenerator>({
            generateFromNow: jest.fn().mockImplementation(() => {
                const result = mockGeneratorResult.toString();
                mockGeneratorResult++;
                return result;
            })
        });
        const mockApp = mock<IAppExtension>({
            workspace: {
                getCenterPanelMarkdownActiveLeaf: jest
                    .fn()
                    .mockImplementation(() => {
                        return mock<MarkdownViewLeafExtension>({
                            getFolderPath: jest
                                .fn()
                                .mockReturnValue(EMPTY_PATH),
                            native: {
                                openFile: jest.fn()
                            }
                        });
                    })
            }
        });
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            errorNoticer,
            mockGenerator,
            mockApp
        );
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        for (let i = 0; i < existingFilesCount + 1; i++) {
            expect(mockPlugin.app.vault.create).toHaveBeenCalledWith(
                `${(mockNowResult + i).toString()}.${MARKDOWN_FILE_EXTENSION}`,
                NO_DATA
            );
        }
    });
    it('should create the note in the same directory as the center panel active one', async () => {
        // Arrange
        const chance = new Chance();
        const mockPlugin = mockDeep<UserPlugins>();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockNoteName = chance.word();
        const mockGenerator = mock<IUniqueNameGenerator>({
            generateFromNow: jest.fn().mockImplementation(() => {
                return mockNoteName;
            })
        });
        const mockActiveLeafFolderPath = `${chance.word()}${path.sep}`;
        const mockMarckdownViewLeaf = mock<MarkdownViewLeafExtension>({
            getFolderPath: jest.fn().mockReturnValue(mockActiveLeafFolderPath),
            native: {
                openFile: jest.fn()
            }
        });
        const mockApp = mock<IAppExtension>({
            workspace: {
                getCenterPanelMarkdownActiveLeaf: jest
                    .fn()
                    .mockImplementation(() => {
                        return mockMarckdownViewLeaf;
                    })
            }
        });
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            errorNoticer,
            mockGenerator,
            mockApp
        );
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        expect(
            mockApp.workspace.getCenterPanelMarkdownActiveLeaf
        ).toHaveBeenCalledTimes(1);
        expect(mockMarckdownViewLeaf.getFolderPath).toHaveBeenCalledTimes(1);
        expect(mockPlugin.app.vault.create).toHaveBeenCalledWith(
            `${mockActiveLeafFolderPath}${mockNoteName}.${MARKDOWN_FILE_EXTENSION}`,
            NO_DATA
        );
    });
    it('should notice if there is no active note in the center panel', async () => {
        // Arrange
        const mockPlugin = mockDeep<UserPlugins>();
        const noticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(noticer);
        const noticeSpy = jest.spyOn(errorNoticer as any, 'notice');
        const mockGenerator = mock<IUniqueNameGenerator>({
            generateFromNow: jest.fn().mockReturnValue(EMPTY_NAME)
        });
        const error = new NoActiveNoteFoundError(PanelPosition.Center);
        const mockApp = mock<IAppExtension>({
            workspace: {
                getCenterPanelMarkdownActiveLeaf: jest
                    .fn()
                    .mockImplementation(() => {
                        throw error;
                    })
            }
        });
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            errorNoticer,
            mockGenerator,
            mockApp
        );
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        expect(noticeSpy).toHaveBeenCalledWith(
            'No active note found in center panel',
            BUSINESS_ERROR_COLOR
        );
    });
    it('should create the YYYYMMDDHHm(m+1).md in less than 10 attempts', async () => {
        // Arrange
        const chance = new Chance();
        const mockPlugin = mockDeep<UserPlugins>({
            app: {
                vault: {
                    create: jest.fn().mockImplementation(() => {
                        throw new Error('File already exists');
                    })
                }
            }
        });
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const noticeSpy = jest.spyOn(errorNoticer as any, 'notice');
        const mockGenerator = mock<IUniqueNameGenerator>({
            generateFromNow: jest.fn().mockReturnValue(chance.word())
        });
        const mockApp = mock<IAppExtension>({
            workspace: {
                getCenterPanelMarkdownActiveLeaf: jest
                    .fn()
                    .mockImplementation(() => {
                        return mock<MarkdownViewLeafExtension>({
                            getFolderPath: jest
                                .fn()
                                .mockReturnValue(chance.word()),
                            native: {
                                openFile: jest.fn()
                            }
                        });
                    })
            }
        });
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            errorNoticer,
            mockGenerator,
            mockApp
        );
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        expect(mockPlugin.app.vault.create).toHaveBeenCalledTimes(
            MAX_NOTE_CREATION_ATTEMPS
        );
        expect(noticeSpy).toHaveBeenCalledWith(
            `Could not create a new unique note after ${MAX_NOTE_CREATION_ATTEMPS} attempts`,
            BUSINESS_ERROR_COLOR
        );
    });
    it('should open the created note in the center panel active note tab with the focus at the end of the file title', async () => {
        // Arrange
        const chance = new Chance();
        const mockNote = mock<TFile>();
        const mockPlugin = mockDeep<UserPlugins>({
            app: {
                vault: {
                    create: jest.fn().mockImplementation(() => {
                        return Promise.resolve<TFile>(mockNote);
                    })
                }
            }
        });
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockNoteName = chance.word();
        const mockGenerator = mock<IUniqueNameGenerator>({
            generateFromNow: jest.fn().mockImplementation(() => {
                return mockNoteName;
            })
        });
        const mockMarckdownViewLeaf = mock<MarkdownViewLeafExtension>({
            getFolderPath: jest.fn().mockReturnValue(EMPTY_PATH),
            native: {
                openFile: jest.fn()
            }
        });
        const mockApp = mock<IAppExtension>({
            workspace: {
                getCenterPanelMarkdownActiveLeaf: jest
                    .fn()
                    .mockImplementation(() => {
                        return mockMarckdownViewLeaf;
                    })
            }
        });
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            errorNoticer,
            mockGenerator,
            mockApp
        );
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        expect(mockMarckdownViewLeaf.native.openFile).toHaveBeenCalledTimes(1);
        expect(mockMarckdownViewLeaf.native.openFile).toHaveBeenCalledWith(
            mockNote,
            {
                state: {
                    mode: 'source'
                },
                eState: {
                    rename: 'end'
                }
            }
        );
    });
});
