import { AbstractCommand } from '@obsinflate/core/obsidian/abstractCommand';
import { Plugin } from 'obsidian';

export type CommandBuilder<TPlugin extends Plugin> = (
    plugin: TPlugin
) => AbstractCommand<TPlugin>;
