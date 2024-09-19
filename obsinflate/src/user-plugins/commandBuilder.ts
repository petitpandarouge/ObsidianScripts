import { AbstractCommand } from "@obsidian/user-plugins/abstractCommand";
import { Plugin } from "@obsidian/user-plugins/plugin";

export type CommandBuilder = (plugin: Plugin) => AbstractCommand;
