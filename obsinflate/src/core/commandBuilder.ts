import { AbstractCommand } from '@obsinflate/core/abstractCommand';
import { Plugin } from 'obsidian';

//TODO user plugins
export type CommandBuilder<TPlugin extends Plugin> = (
    plugin: TPlugin
) => AbstractCommand<TPlugin>;
