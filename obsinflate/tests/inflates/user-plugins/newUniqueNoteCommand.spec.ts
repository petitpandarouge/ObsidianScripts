import { NewUniqueNoteCommand } from '@obsinflate/inflates/user-plugins/newUniqueNoteCommand';
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
import { IUniqueNameGeneratorSeed } from '@obsinflate/core/uniqueNameGeneratorSeed';
import {
    FILE_ALREADY_EXISTS_ERROR_MESSAGE,
    MAX_NOTE_CREATION_ATTEMPTS,
    NO_CONTENT,
    UniqueNoteCreator
} from '@obsinflate/core/uniqueNoteCreator';

const EMPTY_PATH = '';
const EMPTY_NAME = '';

describe('NewUniqueNoteCommand', () => {
    it('should call at least once plugin.app.vault.create', async () => {
        // Arrange
        const mockPlugin = mockDeep<UserPlugins>();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockNameGenerator = mock<IUniqueNameGenerator>({
            generateNewSeed: jest.fn().mockImplementation(() => {
                return mock<IUniqueNameGeneratorSeed>({
                    next: jest.fn().mockReturnValue(EMPTY_NAME)
                });
            })
        });
        const mockApp = mockDeep<IAppExtension>({
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
        const noteCreator = new UniqueNoteCreator(
            mockNameGenerator,
            mockApp.native
        );
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            errorNoticer,
            noteCreator,
            mockApp
        );
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        expect(mockApp.native.vault.create).toHaveBeenCalledTimes(1);
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
        const mockSeed = mock<IUniqueNameGeneratorSeed>({
            next: jest.fn().mockReturnValue(mockNowResult)
        });
        const mockNameGenerator = mock<IUniqueNameGenerator>({
            generateNewSeed: jest.fn().mockImplementation(() => {
                return mockSeed;
            })
        });
        const mockApp = mockDeep<IAppExtension>({
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
        const noteCreator = new UniqueNoteCreator(
            mockNameGenerator,
            mockApp.native
        );
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            errorNoticer,
            noteCreator,
            mockApp
        );
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        expect(mockApp.native.vault.create).toHaveBeenCalledTimes(1);
        expect(mockApp.native.vault.create).toHaveBeenCalledWith(
            `${mockNowResult}${MARKDOWN_FILE_EXTENSION}`,
            NO_CONTENT
        );
        expect(mockNameGenerator.generateNewSeed).toHaveBeenCalledTimes(1);
        expect(mockSeed.next).toHaveBeenCalledTimes(1);
    });
    it('should create a "YYYYMMDDHHm(m+1).md" note if the "YYYYMMDDHHmm.md" file already exists', async () => {
        // Arrange
        const chance = new Chance();
        const mockNowResult = chance.integer({
            min: 100000000000,
            max: 900000000000
        });
        let mockNameGeneratorResult = mockNowResult;
        const existingFilesCount = chance.integer({ min: 1, max: 9 });
        const createdFileName = (mockNowResult + existingFilesCount).toString();
        const mockPlugin = mockDeep<UserPlugins>();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockNameGenerator = mock<IUniqueNameGenerator>({
            generateNewSeed: jest.fn().mockImplementation(() => {
                return mock<IUniqueNameGeneratorSeed>({
                    next: jest.fn().mockImplementation(() => {
                        const result = mockNameGeneratorResult.toString();
                        mockNameGeneratorResult++;
                        return result;
                    })
                });
            })
        });
        const mockApp = mockDeep<IAppExtension>({
            native: {
                vault: {
                    create: jest.fn().mockImplementation((path: string) => {
                        if (path !== createdFileName) {
                            throw new Error('File already exists.');
                        }
                        return Promise.resolve<TFile>(mock<TFile>());
                    })
                }
            },
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
        const noteCreator = new UniqueNoteCreator(
            mockNameGenerator,
            mockApp.native
        );
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            errorNoticer,
            noteCreator,
            mockApp
        );
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        for (let i = 0; i < existingFilesCount + 1; i++) {
            expect(mockApp.native.vault.create).toHaveBeenCalledWith(
                `${(mockNowResult + i).toString()}${MARKDOWN_FILE_EXTENSION}`,
                NO_CONTENT
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
        const mockNameGenerator = mock<IUniqueNameGenerator>({
            generateNewSeed: jest.fn().mockImplementation(() => {
                return mock<IUniqueNameGeneratorSeed>({
                    next: jest.fn().mockImplementation(() => {
                        return mockNoteName;
                    })
                });
            })
        });
        const mockActiveLeafFolderPath = `${chance.word()}${path.sep}`;
        const mockMarckdownViewLeaf = mock<MarkdownViewLeafExtension>({
            getFolderPath: jest.fn().mockReturnValue(mockActiveLeafFolderPath),
            native: {
                openFile: jest.fn()
            }
        });
        const mockApp = mockDeep<IAppExtension>({
            workspace: {
                getCenterPanelMarkdownActiveLeaf: jest
                    .fn()
                    .mockImplementation(() => {
                        return mockMarckdownViewLeaf;
                    })
            }
        });
        const noteCreator = new UniqueNoteCreator(
            mockNameGenerator,
            mockApp.native
        );
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            errorNoticer,
            noteCreator,
            mockApp
        );
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        expect(
            mockApp.workspace.getCenterPanelMarkdownActiveLeaf
        ).toHaveBeenCalledTimes(1);
        expect(mockMarckdownViewLeaf.getFolderPath).toHaveBeenCalledTimes(1);
        expect(mockApp.native.vault.create).toHaveBeenCalledWith(
            `${mockActiveLeafFolderPath}${mockNoteName}${MARKDOWN_FILE_EXTENSION}`,
            NO_CONTENT
        );
    });
    it('should notice if there is no active note in the center panel', async () => {
        // Arrange
        const mockPlugin = mockDeep<UserPlugins>();
        const noticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(noticer);
        const noticeSpy = jest.spyOn(errorNoticer as any, 'notice');
        const mockNameGenerator = mock<IUniqueNameGenerator>({
            generateNewSeed: jest.fn().mockImplementation(() => {
                return mock<IUniqueNameGeneratorSeed>({
                    next: jest.fn().mockReturnValue(EMPTY_NAME)
                });
            })
        });
        const error = new NoActiveNoteFoundError(PanelPosition.Center);
        const mockApp = mockDeep<IAppExtension>({
            workspace: {
                getCenterPanelMarkdownActiveLeaf: jest
                    .fn()
                    .mockImplementation(() => {
                        throw error;
                    })
            }
        });
        const noteCreator = new UniqueNoteCreator(
            mockNameGenerator,
            mockApp.native
        );
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            errorNoticer,
            noteCreator,
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
        const mockPlugin = mockDeep<UserPlugins>();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const noticeSpy = jest.spyOn(errorNoticer as any, 'notice');
        const mockNameGenerator = mock<IUniqueNameGenerator>({
            generateNewSeed: jest.fn().mockImplementation(() => {
                return mock<IUniqueNameGeneratorSeed>({
                    next: jest.fn().mockReturnValue(chance.word())
                });
            })
        });
        const mockApp = mockDeep<IAppExtension>({
            native: {
                vault: {
                    create: jest.fn().mockImplementation(() => {
                        throw new Error(FILE_ALREADY_EXISTS_ERROR_MESSAGE);
                    })
                }
            },
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
        const noteCreator = new UniqueNoteCreator(
            mockNameGenerator,
            mockApp.native
        );
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            errorNoticer,
            noteCreator,
            mockApp
        );
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        expect(mockApp.native.vault.create).toHaveBeenCalledTimes(
            MAX_NOTE_CREATION_ATTEMPTS
        );
        expect(noticeSpy).toHaveBeenCalledWith(
            `Could not create a new unique note after ${MAX_NOTE_CREATION_ATTEMPTS} attempts`,
            BUSINESS_ERROR_COLOR
        );
    });
    it('should open the created note in the center panel active note tab with the focus at the end of the file title', async () => {
        // Arrange
        const chance = new Chance();
        const mockNote = mock<TFile>();
        const mockPlugin = mockDeep<UserPlugins>();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockNoteName = chance.word();
        const mockNameGenerator = mock<IUniqueNameGenerator>({
            generateNewSeed: jest.fn().mockImplementation(() => {
                return mock<IUniqueNameGeneratorSeed>({
                    next: jest.fn().mockImplementation(() => {
                        return mockNoteName;
                    })
                });
            })
        });
        const mockMarckdownViewLeaf = mock<MarkdownViewLeafExtension>({
            getFolderPath: jest.fn().mockReturnValue(EMPTY_PATH),
            native: {
                openFile: jest.fn()
            }
        });
        const mockApp = mockDeep<IAppExtension>({
            native: {
                vault: {
                    create: jest.fn().mockImplementation(() => {
                        return Promise.resolve<TFile>(mockNote);
                    })
                }
            },
            workspace: {
                getCenterPanelMarkdownActiveLeaf: jest
                    .fn()
                    .mockImplementation(() => {
                        return mockMarckdownViewLeaf;
                    })
            }
        });
        const noteCreator = new UniqueNoteCreator(
            mockNameGenerator,
            mockApp.native
        );
        const newUniqueNoteCommand = new NewUniqueNoteCommand(
            mockPlugin,
            errorNoticer,
            noteCreator,
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
