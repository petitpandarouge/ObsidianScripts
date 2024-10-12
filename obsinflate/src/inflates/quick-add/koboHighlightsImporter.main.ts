import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { ScriptEntryPoint } from '@obsinflate/api/quick-add/scriptEntryPoint';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { KoboHighlightsImporter } from '@obsinflate/inflates/quick-add/koboHighlightsImporter';
import { FileSystem } from '@obsinflate/infrastructure/fileSystem';

const entryPoint: ScriptEntryPoint = async (params: Parameters) => {
    const fileSystem = new FileSystem();
    const noticer = new Noticer();
    const errorNoticer = new ErrorNoticer(noticer);
    const importer = new KoboHighlightsImporter(fileSystem, errorNoticer);
    await importer.entry(params);
};

module.exports = entryPoint;
