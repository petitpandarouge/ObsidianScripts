import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { ScriptEntryPoint } from '@obsinflate/api/quick-add/scriptEntryPoint';
import { KoboHighlightsImporter } from '@obsinflate/inflates/quick-add/koboHighlightsImporter';
import { Explorer } from '@obsinflate/infrastructure/explorer';

const entryPoint: ScriptEntryPoint = async (params: Parameters) => {
    const explorer = new Explorer();
    const importer = new KoboHighlightsImporter(explorer);
    await importer.entry(params);
};

module.exports = entryPoint;
