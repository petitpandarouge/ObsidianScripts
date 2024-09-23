import { AbstractCommand } from '@obsinflate/user-plugins/abstractCommand';
import { Plugin } from '@obsinflate/user-plugins/plugin';

export type CommandBuilder = (plugin: Plugin) => AbstractCommand;
