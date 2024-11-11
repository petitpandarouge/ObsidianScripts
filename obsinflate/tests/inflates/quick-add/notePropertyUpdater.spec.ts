import { INoticer } from '@obsinflate/api/obsidian/noticer';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import Chance from 'chance';
import { mock, mockDeep } from 'jest-mock-extended';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { MetaEdit } from '@obsinflate/api/meta-edit/metaEdit';
import { PluginId } from '@obsinflate/api/obsidian/pluginId';
import { PluginNotFoundError } from '@obsinflate/api/obsidian/pluginNotFoundError';
import { NotePropertyUpdater } from '@obsinflate/inflates/quick-add/note-property-updater/script';
import { NotePropertyUpdaterSettings } from '@obsinflate/inflates/quick-add/note-property-updater/settings';

describe('NotePropertyUpdater', () => {
    it('should set the input "Settings.valueVariableName" into the "Settings.propertyNameVariableName" of the "Settings.notePathVariableName" note', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockSettings: NotePropertyUpdaterSettings = {
            propertyValueVariableName: chance.word(),
            propertyNameVariableName: chance.word(),
            notePathVariableName: chance.word()
        };
        const mockMetaEdit = mockDeep<MetaEdit>();
        const mockParams = mockDeep<Parameters>({
            app: {
                plugins: {
                    getPlugin: jest.fn().mockReturnValue(mockMetaEdit)
                }
            },
            variables: {
                [mockSettings.propertyValueVariableName]: chance.word(),
                [mockSettings.propertyNameVariableName]: chance.word(),
                [mockSettings.notePathVariableName]: chance.word()
            }
        });
        const notePropertyUpdater = new NotePropertyUpdater(
            errorNoticer,
            mockSettings
        );
        // Act
        await notePropertyUpdater.entry(mockParams);
        // Assert
        expect(mockParams.app.plugins.getPlugin).toHaveBeenCalledWith(
            PluginId.MetaEdit
        );
        expect(mockMetaEdit.api.update).toHaveBeenCalledWith(
            mockParams.variables[mockSettings.propertyNameVariableName],
            mockParams.variables[mockSettings.propertyValueVariableName],
            mockParams.variables[mockSettings.notePathVariableName]
        );
    });
    it('should throw an error if the MetaEdit plugin is not installed or enabled', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockSettings: NotePropertyUpdaterSettings = {
            propertyValueVariableName: chance.word(),
            propertyNameVariableName: chance.word(),
            notePathVariableName: chance.word()
        };
        const mockParams = mockDeep<Parameters>({
            app: {
                plugins: {
                    getPlugin: jest.fn().mockReturnValue(null)
                }
            },
            variables: {
                [mockSettings.propertyValueVariableName]: chance.word(),
                [mockSettings.propertyNameVariableName]: chance.word(),
                [mockSettings.notePathVariableName]: chance.word()
            }
        });
        const notePropertyUpdater = new NotePropertyUpdater(
            errorNoticer,
            mockSettings
        );
        // Act
        const action = async () => await notePropertyUpdater.entry(mockParams);
        // Assert
        await expect(action).rejects.toThrow(PluginNotFoundError);
    });
});
