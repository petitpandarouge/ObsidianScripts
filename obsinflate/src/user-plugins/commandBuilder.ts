import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';
import { AbstractCommand } from '@obsinflate/abstractCommand';

export type CommandBuilder = (
    plugin: UserPlugins
) => AbstractCommand<UserPlugins>;
