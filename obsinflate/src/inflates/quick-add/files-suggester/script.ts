import { AbstractSettingableScript } from '@obsinflate/core/quick-add/abstractSettingableScript';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { NoFileSelectedError } from '@obsinflate/inflates/quick-add/files-suggester/noFileSelectedError';
import { FileSystem } from '@obsinflate/infrastructure/fileSystem';
import { FilesSuggesterSettings } from './settings';
import { Parameters } from '@obsinflate/api/quick-add/parameters';

export class FilesSuggester extends AbstractSettingableScript<FilesSuggesterSettings> {
    constructor(
        errorNoticer: ErrorNoticer,
        settings: FilesSuggesterSettings,
        private fileSystem: FileSystem
    ) {
        super(errorNoticer, settings);
    }

    protected async innerEntry(params: Parameters): Promise<void> {
        // Input
        // TODO : input must be a variable
        const directoryPath = this.settings.directoryPath;
        // Processing
        const files = await this.fileSystem.getFiles(directoryPath);
        const items: string[] = files.map((file) => file.name);
        const selectedFileName = await params.quickAddApi.suggester(
            items,
            items
        );
        if (selectedFileName === undefined) {
            throw new NoFileSelectedError();
        }
        // Output
        params.variables[this.settings.selectedFileVariableName] = files.find(
            (file) => file.name === selectedFileName
        )!;
    }
}
