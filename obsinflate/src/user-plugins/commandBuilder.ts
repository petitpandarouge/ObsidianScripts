import { AbstractPlugin } from '@obsinflate/abstractPlugin';
import { AbstractCommand } from '@obsinflate/user-plugins/abstractCommand';

export type CommandBuilder = (plugin: AbstractPlugin) => AbstractCommand;
