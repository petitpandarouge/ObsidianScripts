import { AbstractSettingableScript } from '@obsinflate/api/quick-add/abstractSettingableScript';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { FileNameSanitizer as FileNameSanitizerService } from '@obsinflate/core/fileNameSanitizer';
import { FileNameSanitizerSettings } from '@obsinflate/inflates/quick-add/file-name-sanitizer/settings';

export class FileNameSanitizer extends AbstractSettingableScript<FileNameSanitizerSettings> {
    constructor(
        errorNoticer: ErrorNoticer,
        settings: FileNameSanitizerSettings,
        private readonly sanitizer: FileNameSanitizerService
    ) {
        super(errorNoticer, settings);
    }

    protected async innerEntry(params: Parameters): Promise<void> {
        // Input
        const fileName = this.secureGetVariable<string>(
            params,
            this.settings.fileNameVariableName
        );
        // Process
        const sanitizedFileName = this.sanitizer.sanitize(fileName);
        // Output
        params.variables[this.settings.sanitizedFileNameVariableName] =
            sanitizedFileName;
    }
}
