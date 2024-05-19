import { Plugin } from "@obsidian/user-plugins/plugin";

export class MockPlugin implements Plugin {
    addCommand = jest.fn();
    app = {
        vault: {
            create: jest.fn(),
        },
    };
}
