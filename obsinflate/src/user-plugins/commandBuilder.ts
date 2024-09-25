import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';
import { AbstractCommand } from '@obsinflate/user-plugins/abstractCommand';

export type CommandBuilder = (plugin: UserPlugins) => AbstractCommand;
