import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { Script } from '@obsinflate/api/quick-add/script';
import { mockDeep } from 'jest-mock-extended';

class KoboHighlightsImporter implements Script {
    entry(params: Parameters): Promise<void> {
        const displayItems: string[] = [];
        const actualItems: string[] = [];
        params.quickAddApi.suggester(displayItems, actualItems);
        return Promise.resolve();
    }
}

describe('KoboHighlightsImporter', () => {
    it('should suggest the book highlights to import from the "Digital Editions/Annotations" directory ".annot" files', async () => {
        // Arrange
        const importer = new KoboHighlightsImporter();
        const mockParams = mockDeep<Parameters>();
        // Act
        importer.entry(mockParams);
        // Assert
        expect(mockParams.quickAddApi.suggester).toHaveBeenCalledTimes(1);
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
