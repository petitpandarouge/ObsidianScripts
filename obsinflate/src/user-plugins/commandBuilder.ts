import { AbstractCommand } from '@obsinflate/user-plugins/abstractCommand';
import { Plugin } from 'obsidian';

export type CommandBuilder = (plugin: Plugin) => AbstractCommand;
