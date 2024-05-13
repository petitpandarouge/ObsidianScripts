import { loader as newUniqueNote } from '@obsidian/user-plugins/newUniqueNote';
import { NewUniqueNoteCommand } from '@obsidian/user-plugins/newUniqueNoteCommand';
import { mockPlugin } from './mockPlugin';

describe('newUniqueNote', () => {
    it('should add a new command in the loaded plugin', async () => {
        await newUniqueNote.onload(mockPlugin);
        expect(mockPlugin.addCommand).toHaveBeenCalledWith(expect.any(NewUniqueNoteCommand));
    });   
});