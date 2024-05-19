import { AbstractCommand } from "@obsidian/user-plugins/abstractCommand";
import { Plugin } from "@obsidian/user-plugins/plugin";
import Chance from "chance";

const chance = new Chance();

export class MockCommand extends AbstractCommand {
    constructor(plugin: Plugin) {
        super(plugin);
    }
    id = chance.string();
    name = chance.string();
    callback = jest.fn();
}