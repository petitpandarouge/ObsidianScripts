import { mockDeep } from 'jest-mock-extended';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { KoboHighlightsImporter } from '@obsinflate/inflates/quick-add/koboHighlightsImporter';
import Chance from 'chance';
import { File, IExplorer } from '@obsinflate/infrastructure/explorer';

describe('KoboHighlightsImporter', () => {
    it('should suggest the book highlights to import from the "Digital Editions/Annotations" directory ".annot" files', async () => {
        // Arrange
        const chance = new Chance();
        const filesCount = chance.integer({ min: 1, max: 10 });
        const files: File[] = [];
        for (let i = 0; i < filesCount; i++) {
            files.push({
                name: `${chance.sentence()}.annot`,
                path: `${chance.sentence()}.annot`
            });
        }
        const mockExplorer = mockDeep<IExplorer>({
            getFiles: jest.fn().mockReturnValue(files)
        });
        const importer = new KoboHighlightsImporter(mockExplorer);
        const mockParams = mockDeep<Parameters>();
        // Act
        importer.entry(mockParams);
        // Assert
        expect(mockParams.quickAddApi.suggester).toHaveBeenCalledWith(
            files.map((f) => f.name),
            files.map((f) => f.path)
        );
    });
    it.todo('should read the content of the selected ".annot" file');
    it.todo('should deserialize the fragment of an annotation');
    it.todo('should deserialize the content of an annotation');
    it.todo('should deserialize all the annotations');
    it.todo('should format the annotations in markdown quotes');
    it.todo(
        'should create a markdown file having the name "YYYYMMDDHHmm - Book Title.md"'
    );
    it.todo('should apply the "Livre" template to the markdown file');
    it.todo('should create the author note if it does not already exist');
    it.todo(
        'should reference the author note in the "author" property of the book note'
    );
});
