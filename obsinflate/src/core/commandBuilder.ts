import { AbstractCommand } from '@obsinflate/core/abstractCommand';
import { Plugin } from 'obsidian';

export type CommandBuilder<TPlugin extends Plugin> = (
    plugin: TPlugin
) => AbstractCommand<TPlugin>;
