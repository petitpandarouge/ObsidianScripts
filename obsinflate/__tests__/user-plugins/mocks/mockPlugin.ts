import { Plugin } from "@obsidian/user-plugins/plugin";

/*
 * All the methods in this class must be mocked with the basic jest.fn().
 * To overload a method, you can use jest.fn().mockImplementation(); to provide your own implementation in the test.
 * 
 * Example:
 * import { MockPlugin } from './mocks/mockPlugin';
 * const mockPlugin = new MockPlugin();
 * mockPlugin.addCommand = jest.fn().mockImplementation(() => { /* your implementation here * / });
 */ 
export class MockPlugin implements Plugin {
    addCommand = jest.fn();
    app = {
        vault: {
            create: jest.fn(),
        },
    };
}
