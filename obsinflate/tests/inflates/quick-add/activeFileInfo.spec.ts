import { INoticer } from '@obsinflate/api/obsidian/noticer';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import Chance from 'chance';
import { mock, mockDeep } from 'jest-mock-extended';
import { TFile } from 'obsidian';
import { NoActiveFileFoundError } from '@obsinflate/api/obsidian/noActiveFileFoundError';
import { PREVENT_CRASH_STRING } from '@obsinflate/tests/data/constants';
import { ActiveFileInfos } from '@obsinflate/inflates/quick-add/active-file-infos/script';

describe('ActiveFileInfos', () => {
    it('should raise an error if there is no active file in the workspace', async () => {
        // Arrange
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockSettings = {
            basenameVariableName: PREVENT_CRASH_STRING,
            pathVariableName: PREVENT_CRASH_STRING
        };
        const mockParams = mockDeep<Parameters>({
            app: {
                workspace: {
                    getActiveFile: jest.fn().mockReturnValue(null)
                }
            }
        });
        const script = new ActiveFileInfos(errorNoticer, mockSettings);
        // Act
        const action = async () => await script.entry(mockParams);
        // Assert
        await expect(action).rejects.toThrow(NoActiveFileFoundError);
    });
    it('should set the active file basename and path into the "Settings.basenameVariableName" and "Settings.pathVariableName" variables', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockSettings = {
            basenameVariableName: chance.word(),
            pathVariableName: chance.word()
        };
        const activeFileBaseName = chance.word();
        const activeFilePath = chance.word();
        const mockParams = mockDeep<Parameters>({
            app: {
                workspace: {
                    getActiveFile: jest.fn().mockReturnValue(
                        mock<TFile>({
                            basename: activeFileBaseName,
                            path: activeFilePath
                        })
                    )
                }
            }
        });
        const script = new ActiveFileInfos(errorNoticer, mockSettings);
        // Act
        await script.entry(mockParams);
        // Assert
        expect(mockParams.variables[mockSettings.basenameVariableName]).toBe(
            activeFileBaseName
        );
        expect(mockParams.variables[mockSettings.pathVariableName]).toBe(
            activeFilePath
        );
    });
});
