import { loader as newProject } from '@obsidian/user-plugins/newProject';
import { NewProjectCommand } from '@obsidian/user-plugins/newProjectCommand';

const mockPlugin = {
    addCommand: jest.fn(),
};

describe('newProject', () => {
    it('should add a new command in the loaded plugin', async () => {
        await newProject.onload(mockPlugin);
        expect(mockPlugin.addCommand).toHaveBeenCalledWith(expect.any(NewProjectCommand));
    });   
});